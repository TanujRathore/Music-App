from rest_framework import serializers
from MusicPlayerApp.models import UserRole, MusicList

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
        MusicList.objects.create(musicListName="Morning Motivation", userBelongTo=user_instance.username, musicListProfilePic="CDSQUAD/back-end/media/MorningMotivation")
        MusicList.objects.create(musicListName="Daily Activity Background", userBelongTo=user_instance.username, musicListProfilePic="CDSQUAD/back-end/media/DailyActivityBackground")
        MusicList.objects.create(musicListName="Afternoon Relaxation", userBelongTo=user_instance.username, musicListProfilePic="CDSQUAD/back-end/media/AfternoonRelaxation")
        MusicList.objects.create(musicListName="Sleep Preparation", userBelongTo=user_instance.username, musicListProfilePic="CDSQUAD/back-end/media/SleepPreparation")
        return user_instance
