from rest_framework import serializers
from rest_framework.reverse import reverse

from gallery.models import Album, Photo


class PhotoSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='file.url', read_only=True)

    class Meta:
        model = Photo
        fields = ['uuid', 'url', 'visible']


class AlbumListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['uuid', 'name', 'cover', 'created_at', 'updated_at']


class AlbumRetrieveSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True)

    class Meta:
        model = Album
        fields = ['uuid', 'name', 'cover', 'created_at', 'updated_at', 'photos']
