from django import forms
from django.contrib import admin
from django.utils.html import format_html
from django.urls import path, reverse

from gallery.models import (
    Photo,
    Album,
    Person,
    Location,
    Event,
)
from gallery.admin_views import PhotoMultiUploadAdminView


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    fields = ('name', 'slug', 'photos')


class PersonInline(admin.TabularInline):
    model = Person


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    fields = ('name', 'slug', 'albums',)


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    fields = ('name', 'slug', 'albums',)


class PhotoInline(admin.TabularInline):
    model = Photo
    fields = ("file", "preview", "visible",)
    readonly_fields = ("file", "preview", "tagged",)
    ordering = ("created_at",)
    extra = 0

    @admin.display()
    def preview(self, obj):
        if obj.file:
            return format_html(f"<img src='{obj.file.url}' height='200'>")

    @admin.display()
    def tagged(self, obj):
        return obj.persons_set.all()


class AlbumAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['cover'].queryset = Photo.objects.filter(album=self.instance)


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    def preview(self, obj):
        return format_html(f"<img src='{obj.file.url}' height='200'>")

    fields = ["album", "file", "visible",]
    list_display = ['uuid', 'preview', 'tagged']
    ordering = ["album__created_at", "album", "created_at"]

    @admin.display()
    def tagged(self, obj):
        return list(map(lambda x: x.name, obj.person_set.all()))


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    form = AlbumAdminForm
    list_display = ['name', 'preview', 'upload',]
    fields = ["name", "published", "cover", "date", "description"]
    inlines = [PhotoInline]

    @admin.display()
    def preview(self, obj):
        if obj.cover:
            return format_html(f"<img src='{obj.cover.file.url}' height='200'>")

    def get_urls(self):
        urls = super().get_urls()
        urls.append(
            path(
                "<pk>/upload",
                self.admin_site.admin_view(PhotoMultiUploadAdminView.as_view()),
                name="album_photo_multiupload",
            )
        )
        return urls

    def upload(self, obj):
        url = reverse("admin:album_photo_multiupload", args=[obj.pk])
        return format_html(f'<a href="{url}">Upload Photos</a>')

