from django.contrib import admin
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.http import HttpResponseRedirect
from django.urls import reverse

from django.views.generic import ListView, DetailView
from gallery.models import Album, Photo


class AlbumListView(ListView):
    model = Album
    queryset = Album.objects.filter(published=True)


class AlbumDetailView(DetailView):
    model = Album
    slug_url_kwarg = "gallery_slug"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        current_album = self.get_object()
        context_data['photos'] = Photo.objects.filter(album=current_album, visible=True)
        return context_data


class PhotoDetailView(DetailView):
    model = Photo
    pk_url_kwarg = "photo_uuid"


class PhotoMultiUploadAdminView(PermissionRequiredMixin, DetailView):
    permission_required = 'gallery.edit_album'
    template_name = 'admin/photo_upload_admin.html'
    model = Album

    def get_context_data(self, **kwargs):
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts": self.model._meta,
        }

    def post(self, request, *args, **kwargs):
        uploaded_files = request.FILES.getlist('photos')
        current_album = self.get_object()
        for file in uploaded_files:
            p = Photo(file=file, album=current_album)
            p.save()
        return HttpResponseRedirect(reverse("admin:gallery_album_change", args=[current_album.pk]))
