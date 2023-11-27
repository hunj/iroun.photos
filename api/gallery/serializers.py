from rest_framework import serializers
from gallery.models import Album, Photo
from gallery.helpers import get_exif_data


class PhotoSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='file.url', read_only=True)
    thumbnail = serializers.CharField(source='thumbnail.url', read_only=True)
    album = serializers.SerializerMethodField()
    exif_data = serializers.SerializerMethodField()

    def get_album(self, obj):
        if not obj.album:
            return None
        return {
            'uuid': obj.album.uuid,
            'name': obj.album.name,
        }

    def get_exif_data(self, obj):
        return get_exif_data(obj.file)

    class Meta:
        model = Photo
        fields = ['uuid', 'url', 'thumbnail', 'exif_data', 'album', 'visible']
        depth = 1


class AlbumListSerializer(serializers.ModelSerializer):
    cover = serializers.SerializerMethodField()

    def get_cover(self, obj):
        if not obj.cover:
            return None
        return obj.cover.thumbnail.url

    class Meta:
        model = Album
        fields = ['uuid', 'name', 'cover', 'slug', 'description', 'date']


class AlbumRetrieveSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True)

    class Meta:
        model = Album
        fields = ['uuid', 'name', 'cover', 'date', 'description', 'photos']
