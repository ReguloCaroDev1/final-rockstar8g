from rest_framework import serializers
from .models import *

class SongsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Songs
		fields = ['id', 'name','realeaseDate', 'album' ,'singer','duration', 'completeFile', 'previewFile', 'price']


class GenreSerializer(serializers.ModelSerializer):	
	class Meta:	
		model = Genre
		fields = ['id', 'description']

class AlbumSerializer(serializers.ModelSerializer):
	#songsalbum = serializers.StringRelatedField(many=True)
	albumgenre = GenreSerializer(many=True,read_only=True)
	songsalbum = SongsSerializer(many=True,read_only=True)
	class Meta:
		model = Album
		fields = ['id', 'name', 'singer','genre','albumgenre', 'realeaseDate', 'price', 'stock', 'images', 'songsalbum']



class SingerSerializer(serializers.ModelSerializer):
	#albumsinger = serializers.StringRelatedField(many=True)
	albumsinger = AlbumSerializer(many=True,read_only=True)
	#songsinger = serializers.StringRelatedField(many=True)
	songsinger = SongsSerializer(many=True,read_only=True)
	class Meta:
		model = Singer
		fields = ['id', 'name', 'last_name', 'stageName', 'nationality','image', 'albumsinger', 'songsinger']
