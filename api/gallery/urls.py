from django.urls import path
from . import views

urlpatterns = [
    path("", views.AlbumListAPIView.as_view(), name="gallery_list"),
    path("<uuid:album_uuid>", views.AlbumRetrieveAPIView.as_view(), name="gallery_details"),
    path("<uuid:album_uuid>/<uuid:photo_uuid>", views.PhotoRetrieveAPIView.as_view(), name="gallery_photo_details"),

    path("tagged/<uuid:person_uuid>", views.TaggedListAPIView.as_view(), name="search_by_tag"),
    # path("event/<slug:event_slug>", views, name="search_by_event"),
    # path("location/<slug:location_slug>", views, name="search_by_location"),
]
