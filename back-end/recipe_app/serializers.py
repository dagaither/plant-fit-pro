from rest_framework.serializers import ModelSerializer
from .models import Recipe, Favorite

class AllFavoriteSerializer(ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "dish"]

class AFavoriteSerializer(ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["dish"]
