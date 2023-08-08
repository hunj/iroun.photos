from django.db import models
from common.models import BaseModel


class Gallery(BaseModel):
    name = models.CharField()


class Photo(BaseModel):
    gallery = models.ForeignKey(Gallery)
    file = models.ImageField(upload_to='photos/')
