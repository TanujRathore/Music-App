from rest_framework import serializers
from MusicPlayerApp.models import Employees, Musics

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ('EmployeeId',
                'EmployeeName')
        
class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musics
        fields = ('MusicID',
                'MusicName')
