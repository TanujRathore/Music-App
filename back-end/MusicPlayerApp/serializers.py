from rest_framework import serializers
from MusicPlayerApp.models import MusicList, Musics

class MusicListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicList
        fields = ('MusicListId',
                'MusicListName',
                'MusicListProfilePic')
        
class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musics
        fields = ('MusicID',
                'MusicName')
