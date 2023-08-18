from django.db import models
from common.models import BaseModel


class Album(BaseModel):
    name = models.CharField(max_length=256)


class Photo(BaseModel):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    file = models.ImageField(upload_to='photos/')
