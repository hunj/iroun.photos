import pathlib
from PIL import Image, ExifTags
from fractions import Fraction
from io import BytesIO
import sys

from django.core.files.uploadedfile import InMemoryUploadedFile


THUMBNAIL_SIZE = (512, 512)
THUMBNAIL_FORMAT = "JPEG"
THUMBNAIL_CONTENT_TYPE = "image/jpeg"
THUMBNAIL_QUALITY = 95


def photo_upload_directory_name(instance, filename):
    return "photos/" + str(instance.uuid) + pathlib.Path(filename).suffix.lower()


def thumbnail_upload_directory_name(instance, filename):
    return "thumbnails/" + str(instance.uuid) + pathlib.Path(filename).suffix.lower()


def create_thumbnail_file(photo) -> InMemoryUploadedFile:
    original_image = Image.open(photo.file.path)
    image = original_image.copy()
    image.thumbnail(THUMBNAIL_SIZE, Image.LANCZOS)

    image_bytes = BytesIO()
    image.save(
        image_bytes,
        format=THUMBNAIL_FORMAT,
        quality=THUMBNAIL_QUALITY
    )
    return InMemoryUploadedFile(
        image_bytes,
        'ImageField',
        thumbnail_upload_directory_name(photo, photo.file.name),
        THUMBNAIL_CONTENT_TYPE,
        sys.getsizeof(image_bytes),
        None
    )


def get_exif_data(photo):
    img = Image.open(photo.file)
    img.verify()
    exif_data = img._getexif()
    exif = {ExifTags.TAGS.get(k, k): v for k, v in exif_data.items()}

    exif_fields = [
        'Model',  # camera
        'FocalLength',
        'ExposureTime',
        'FNumber',
        'ISOSpeedRatings',
        'LensModel',
    ]

    filtered_exif = dict(filter(lambda x: x[0] in exif_fields, exif.items()))

    if focal_length := filtered_exif.get('FocalLength'):
        filtered_exif['FocalLength'] = int(focal_length)

    if shutter_speed := filtered_exif.get('ExposureTime'):
        filtered_exif['ExposureTime'] = Fraction(shutter_speed)

    return filtered_exif
