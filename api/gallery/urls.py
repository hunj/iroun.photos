from django.urls import path
from . import views

urlpatterns = [
    path("", views.AlbumListAPIView.as_view(), name="album_list"),
    path("<uuid:album_uuid>", views.AlbumRetrieveAPIView.as_view(), name="album_details"),
    path("<uuid:album_uuid>/photo/<uuid:photo_uuid>", views.PhotoRetrieveAPIView.as_view(), name="album_photo_details"),
]
