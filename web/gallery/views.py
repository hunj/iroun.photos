from django.views.generic import ListView, DetailView
from gallery.models import Album, Photo


class AlbumListView(ListView):
    model = Album
    queryset = Album.objects.filter(published=True)


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
