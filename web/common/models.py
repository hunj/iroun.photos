from django.db import models
from uuid import uuid4


class BaseModel(models.Model):
    uuid = models.UUIDField(priamry_key=True, default=uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
