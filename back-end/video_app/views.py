from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout, authenticate
from dotenv import dotenv_values
from bs4 import BeautifulSoup
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED
import requests
import random
from .serializers import Video, Favorite, AFavoriteSerializer, AllFavoriteSerializer

# Create your views here.

env = dotenv_values(".env")

class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class GetRandomVideo(TokenReq):
    def get(self, request):
        # Fetch random video URL
        random_video_url = self.get_random_video_url()
        if random_video_url:
            return Response({"video_url": random_video_url}, status=HTTP_200_OK)
        else:
            return Response({'error': 'Failed to fetch random video URL'}, status=HTTP_400_BAD_REQUEST)

    def get_random_video_url(self):
        url = "http://www.nutritionfacts.org/random"
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        iframe = soup.find('iframe', class_='youtube-video')
        if iframe:
            video_url = iframe['src']
            return video_url
        else:
            return None
        
class AddToFavorites(TokenReq):
    def post(self, request):
        video_url = request.data.get('video_url')
        video, _ = Video.objects.get_or_create(app_user=request.user)
        favorite, created = Favorite.objects.get_or_create(video=video, video_url=video_url)
        if not created:
            return Response("Video already in Favorites!", status=HTTP_400_BAD_REQUEST)
        else:
            return Response("Video added to Favorites!", status=HTTP_201_CREATED)
    # def post(self, request, video_url):
    #     video, created = Video.objects.get_or_create(app_user=request.user)
    #     favorite, created = Favorite.objects.get_or_create(video=video, video_url=vid_url)
    #     if not created:
    #         return Response("Video already in Favorites!", status=HTTP_400_BAD_REQUEST)
    #     else:
    #         return Response("Video added to Favorites!", status=HTTP_201_CREATED)
        
class AllFavorites(TokenReq):
    def get(self, request):
        user_video, created = Video.objects.get_or_create(app_user=request.user)
        user_favs = Favorite.objects.all()
        ser_favs = AllFavoriteSerializer(user_favs, many=True)
        serialized_data = ser_favs.data
        return Response(serialized_data, status=HTTP_200_OK)

class AFavorite(TokenReq):
    def get(self, request, id):
        user_video = Video.objects.get(app_user=request.user)
        user_fav = get_object_or_404(Favorite, id=id)
        ser_fav = AFavoriteSerializer(user_fav)
        serialized_data = ser_fav.data
        return Response(serialized_data, status=HTTP_200_OK)
    
    def delete(self, request, id):
        user_video = Video.objects.get(app_user=request.user)
        user_fav = get_object_or_404(Favorite, id=id)
        user_fav.delete()
        return Response(status=HTTP_200_OK)