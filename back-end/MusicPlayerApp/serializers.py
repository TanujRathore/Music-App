from rest_framework import serializers
from MusicPlayerApp.models import MusicList, Musics

class MusicListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicList
        fields = '__all__'
        
class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musics
        fields = '__all__'
