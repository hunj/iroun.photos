from django.db import models
from django.utils.text import slugify
from common.models import BaseModel
from gallery.helpers import (
    photo_upload_directory_name,
    thumbnail_upload_directory_name,
    create_thumbnail_file,
    get_exif_data,
)


class Album(BaseModel):
    name = models.CharField(max_length=256)
    published = models.BooleanField(default=False)
    cover = models.OneToOneField('Photo', related_name='cover', on_delete=models.SET_NULL, null=True, blank=True)
    slug = models.SlugField(default="", null=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.name:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Photo(BaseModel):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="photos")
    file = models.ImageField(upload_to=photo_upload_directory_name)
    thumbnail = models.ImageField(upload_to=thumbnail_upload_directory_name, blank=True)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.file.name

    def save(self, *args, **kwargs):
        if not self.file:
            return

        self.thumbnail = create_thumbnail_file(self)
        super().save(*args, **kwargs)

    def exif_data(self):
        return get_exif_data(self.file)

    def exif_data_exposure(self):
        exif = self.exif_data()
        return f"{exif['ExposureTime']} sec at 𝑓/{exif['FNumber']}, ISO {exif['ISOSpeedRatings']}"

    def exif_data_lens(self):
        exif = self.exif_data()
        lens_info = exif.get('LensModel')
        if not lens_info or lens_info == "0.0 mm f/0.0":
            lens_info = "Unknown Lens"

        return f"{exif['FocalLength']}mm ({lens_info})"


class Person(BaseModel):
    name = models.CharField(max_length=64)
    slug = models.SlugField(default="", null=False, blank=True)
    photos = models.ManyToManyField(Photo, related_name="tagged")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.name:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Location(BaseModel):
    name = models.CharField(max_length=64)
    slug = models.SlugField(default="", null=False, blank=True)
    albums = models.ManyToManyField(Album, related_name="locations")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.name:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Event(BaseModel):
    name = models.CharField(max_length=64)
    slug = models.SlugField(default="", null=False, blank=True)
    albums = models.ManyToManyField(Album, related_name="events")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.name:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
