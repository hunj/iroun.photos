from django.urls import path
from . import views

urlpatterns = [
    path("", views.AlbumListView.as_view(), name="gallery_list"),
    path("<uuid:uuid>", views.AlbumDetailView.as_view(), name="gallery_details"),
    path("<uuid:gallery_uuid>/photo/<uuid:photo_uuid>", views.PhotoDetailView.as_view(), name="gallery_photo_details"),
]
