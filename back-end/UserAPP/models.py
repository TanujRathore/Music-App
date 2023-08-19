from django.db import models
# Create your models here.


class UserRole(models.Model):
    username = models.CharField(max_length=100,primary_key=True)
    role = models.CharField(max_length=100)
