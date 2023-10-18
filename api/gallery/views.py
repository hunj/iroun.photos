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
    lookup_url_kwarg = 'album_uuid'
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
        gallery_uuid = self.kwargs.get('album_uuid')
        queryset = Photo.objects.filter(album__uuid=gallery_uuid)
        return queryset
