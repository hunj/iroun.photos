from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

from django.contrib.auth.mixins import PermissionRequiredMixin
from django.views.generic import DetailView
from gallery.models import Album, Photo


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
