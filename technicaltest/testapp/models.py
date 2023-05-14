from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=80)
    last_name = models.CharField(max_length=80)
    email = models.CharField(max_length=80, unique=True)
    role = models.CharField(max_length=80)
    department = models.CharField(max_length=80)
    age = models.IntegerField()
    address = models.CharField(max_length=200)
