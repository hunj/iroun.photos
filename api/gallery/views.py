from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView

from gallery.serializers import AlbumListSerializer, AlbumRetrieveSerializer, PhotoSerializer
from gallery.models import Album, Photo


class AlbumListAPIView(ListAPIView):
    model = Album
    queryset = Album.objects.filter(published=True)
    serializer_class = AlbumListSerializer


class AlbumRetrieveAPIView(RetrieveAPIView):
    model = Album
    lookup_field = 'uuid'
    lookup_url_kwarg = 'gallery_uuid'
    serializer_class = AlbumRetrieveSerializer

    def get_queryset(self):
        queryset = Album.objects.filter(published=True).prefetch_related('photos')
        return queryset


class PhotoRetrieveAPIView(RetrieveAPIView):
    model = Photo
    lookup_field = 'uuid'
    lookup_url_kwarg = 'photo_uuid'
    serializer_class = PhotoSerializer

    def get_queryset(self):
        gallery_uuid = self.kwargs.get('gallery_uuid')
        queryset = Photo.objects.filter(album__uuid=gallery_uuid)
        return queryset


class AlbumDetailView(DetailView):
    model = Album
    pk_url_kwarg = "gallery_uuid"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        current_album = self.get_object()
        context_data['photos'] = Photo.objects.filter(album=current_album, visible=True)
        return context_data


class PhotoDetailView(DetailView):
    model = Photo
    pk_url_kwarg = "photo_uuid"
