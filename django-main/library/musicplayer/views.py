from rest_framework import viewsets
from rest_framework import views
from rest_framework import permissions
from library.musicplayer.serializers import *
import base64
from rest_framework.response import Response
from rest_framework.parsers import FormParser, FileUploadParser, MultiPartParser, JSONParser
from rest_framework import mixins


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all().order_by('id')
    serializer_class = AlbumSerializer
    permission_classes = []

    def list(self, request):
        album_queryset = Album.objects.filter(id__gt = 0)
        serializer = AlbumSerializer(album_queryset, many = True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        album_queryset = Album.objects.filter(id = pk)
        serializer = AlbumSerializer(album_queryset)
        return Response(serializer.data)

class SongsViewSet(viewsets.ModelViewSet):
    queryset = Songs.objects.all().order_by('id')
    serializer_class = SongsSerializer
    permission_classes = []

    def list(self, request):
        songs_queryset = Songs.objects.filter(id__gt = 0)
        serializer = SongsSerializer(songs_queryset, many = True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        songs_queryset = Album.objects.filter(id = pk)
        serializer = SongsSerializer(songs_queryset)
        return Response(serializer.data)

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all().order_by('id')
    serializer_class = GenreSerializer
    permission_classes = []

class SingerViewSet(viewsets.ModelViewSet):
    queryset = Singer.objects.all().order_by('name')
    serializer_class = SingerSerializer
    permission_classes = []
