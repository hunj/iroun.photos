import pathlib
from PIL import Image, ExifTags, TiffImagePlugin
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
    original_image = Image.open(photo.file)
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
    exif = {
        ExifTags.TAGS[k]: Fraction(v) if isinstance(v, TiffImagePlugin.IFDRational) else v
        for k, v in exif_data.items()
        if k in ExifTags.TAGS
    }

    filtered_exif = {
        'camera': exif['Model'],
        'focal_length': f"{int(exif['FocalLength'])}mm",
        'shutter_speed': f"{exif['ExposureTime']}s",
        'aperture': f"f{float(exif['FNumber'])}",
        'iso': str(exif['ISOSpeedRatings']),
        'lens_info': exif['LensModel'] if exif['LensModel'] != '0.0 mm f/0.0' else "Unknown Lens",
    }

    return filtered_exif
