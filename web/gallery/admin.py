from django import forms
from django.contrib import admin
from django.utils.html import format_html

from gallery.models import Photo, Album


class PhotoAdminForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = "__all__"


class AlbumAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['cover'].queryset = Photo.objects.filter(album=self.instance)


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    form = AlbumAdminForm
    fields = ["name", "published", "cover"]

    def preview(self, obj):
        if obj.cover:
            return format_html(f"<img src='{obj.cover.file.url}' width='200'>")

    list_display = ['name', 'preview',]


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):

    def preview(self, obj):
        return format_html(f"<img src='{obj.file.url}' width='200'>")

    fields = ["album", "file", "visible"]
    list_display = ['uuid', 'preview',]
