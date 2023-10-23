from django.db import models
from common.models import BaseModel
from gallery.helpers import photo_upload_directory_name, get_exif_data


class Album(BaseModel):
    name = models.CharField(max_length=256)
    published = models.BooleanField(default=False)
    cover = models.OneToOneField('Photo', related_name='cover', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class Photo(BaseModel):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    file = models.ImageField(upload_to=photo_upload_directory_name)
    thumbnail = models.ImageField(upload_to=thumbnail_upload_directory_name, blank=True)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.file.name

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
