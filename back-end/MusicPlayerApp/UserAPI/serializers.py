# serializers.py

from rest_framework import serializers
from MusicPlayerApp.models import UserRole

class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ('username', 
                  'role',
                  'firstname',
                  'lastname')
