from django.urls import path
from . import views

urlpatterns = [
    path("", views.AlbumListView.as_view(), name="gallery_list"),
    path("<uuid:gallery_uuid>", views.AlbumDetailView.as_view(), name="gallery_details"),
    path("<uuid:gallery_uuid>/photo/<uuid:photo_uuid>", views.PhotoDetailView.as_view(), name="gallery_photo_details"),

    # path("tagged/<slug:person_slug>", views, name="search_by_tag"),
    # path("event/<slug:event_slug>", views, name="search_by_event"),
    # path("location/<slug:location_slug>", views, name="search_by_location"),
]
