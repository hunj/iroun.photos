from django.urls import path
from . import views

urlpatterns = [
    path("", views.AlbumListAPIView.as_view(), name="gallery_list"),
    path("<uuid:gallery_uuid>", views.AlbumRetrieveAPIView.as_view(), name="gallery_details"),
    path("<uuid:gallery_uuid>/photo/<uuid:photo_uuid>", views.PhotoRetrieveAPIView.as_view(), name="gallery_photo_details"),
]
