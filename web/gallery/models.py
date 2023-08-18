from django.db import models
from common.models import BaseModel


class Gallery(BaseModel):
    name = models.CharField(max_length=256)


class Photo(BaseModel):
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE)
    file = models.ImageField(upload_to='photos/')
