from django.db import models

# Create your models here.
class MusicList(models.Model):
    MusicListId = models.AutoField(primary_key=True)
    MusicListName = models.CharField(max_length=100)
    MusicListProfilePic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
class Musics(models.Model):
    MusicID = models.AutoField(primary_key=True)
    MusicName = models.CharField(max_length=100)
class UserRole(models.Model):
    username = models.CharField(max_length=100,primary_key=True)
    role = models.CharField(max_length=100)