from django.db import models
from user_app.models import App_user

# Create your models here.

class Video(models.Model):
    app_user = models.OneToOneField(App_user, on_delete=models.CASCADE)

class Favorite(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="videos")
    video_url = models.JSONField()