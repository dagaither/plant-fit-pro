from rest_framework.serializers import ModelSerializer
from .models import Video, Favorite

class AllFavoriteSerializer(ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "video_url"]

class AFavoriteSerializer(ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["video_url"]