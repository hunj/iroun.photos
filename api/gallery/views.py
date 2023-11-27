from rest_framework.generics import ListAPIView, RetrieveAPIView
from gallery.models import Album, Photo, Person
from gallery.serializers import AlbumListSerializer, AlbumRetrieveSerializer, PhotoSerializer


class AlbumListAPIView(ListAPIView):
    model = Album
    queryset = Album.objects.filter(published=True).order_by('-date')
    serializer_class = AlbumListSerializer


class AlbumRetrieveAPIView(RetrieveAPIView):
    queryset = Album.objects.all()
    lookup_url_kwarg = "album_slug"
    lookup_field = "slug"
    serializer_class = AlbumRetrieveSerializer


class PhotoRetrieveAPIView(RetrieveAPIView):
    queryset = Photo.objects.all()
    lookup_url_kwarg = "photo_uuid"
    lookup_field = "uuid"
    serializer_class = PhotoSerializer


class TaggedListAPIView(RetrieveAPIView):
    model = Person
    slug_url_kwarg = "person_slug"
    context_object_name = "person"
    serializer_class = PhotoSerializer


# class LocationListView(DetailView):
#     model = Person
#     slug_url_kwarg = "person_slug"
#     context_object_name = "person"


# class EventListView(DetailView):
#     model = Person
#     slug_url_kwarg = "person_slug"
#     context_object_name = "person"
