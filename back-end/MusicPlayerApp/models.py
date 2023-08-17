from django.db import models

# Create your models here.
class Employees(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=100)
    
class Musics(models.Model):
    MusicID = models.AutoField(primary_key=True)
    MusicName = models.CharField(max_length=100)
