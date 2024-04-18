from django.db import models
from user_app.models import App_user

# Create your models here.

class Recipe(models.Model):
    app_user = models.OneToOneField(App_user, on_delete=models.CASCADE)

class Favorite(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="favorites")
    dish = models.JSONField()
