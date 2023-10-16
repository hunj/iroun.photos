import pathlib
from PIL import Image, ExifTags
from fractions import Fraction


def photo_upload_directory_name(instance, filename):
    return "photos/" + str(instance.uuid) + pathlib.Path(filename).suffix.lower()


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
