from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v

# Create your models here.

class App_user(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=36, unique=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['__all__']