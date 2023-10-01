from rest_framework import serializers
from MusicPlayerApp.models import UserRole, MusicList, Musics

class MusicListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicList
        fields = ('musicListId', 'musicListName', 'userBelongTo', 'musicIn')

class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ('username', 
                  'role',
                  'firstname',
                  'lastname')

    def validate_username(self, value):
        return value.lower()
    
    def validate_firstname(self, value):
        return value.lower()
    
    def validate_lastname(self, value):
        return value.lower()

    def create(self, validated_data):
        # create the user role instance
        user_instance = UserRole.objects.create(**validated_data)
        
        # create the five default music lists for this user
        MusicList.objects.create(musicListName="Favourite", userBelongTo=user_instance.username)
        MusicList.objects.create(musicListName="Favourite1", userBelongTo=user_instance.username)
        MusicList.objects.create(musicListName="Favourite2", userBelongTo=user_instance.username)
        MusicList.objects.create(musicListName="Favourite3", userBelongTo=user_instance.username)
        MusicList.objects.create(musicListName="Favourite4", userBelongTo=user_instance.username)
        return user_instance
