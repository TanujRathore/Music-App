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
    def validate_username(self, value):
        return value.lower()
    
    def validate_firstname(self, value):
        return value.lower()
    
    def validate_lastname(self, value):
        return value.lower()