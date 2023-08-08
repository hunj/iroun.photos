from django.views.generic import ListView, DetailView
from django.shortcuts import render

from gallery.models import Gallery, Photo


class GalleryListView(ListView):
    model = Gallery


class GalleryDetailView(DetailView):
    model = Gallery


class PhotoDetailView(DetailView):
    model = Photo
    