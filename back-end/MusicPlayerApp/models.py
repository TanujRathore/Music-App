from django.db import models

# Create your models here.
class Employees(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
class Musics(models.Model):
    MusicID = models.AutoField(primary_key=True)
    MusicName = models.CharField(max_length=100)
