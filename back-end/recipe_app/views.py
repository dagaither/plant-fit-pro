from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout, authenticate
from dotenv import dotenv_values
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_201_CREATED
import requests
import random
from .models import Recipe, Favorite
from .serializers import AFavoriteSerializer, AllFavoriteSerializer

# Create your views here.

env = dotenv_values(".env")

class GetRandomRecipe(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        num = random.randint(1, 386)
        url = f'https://the-vegan-recipes-db.p.rapidapi.com/{num}'
        headers = {"X-RapidAPI-Key": env.get('R_API_KEY')}
        response = requests.get(url, headers=headers)
        json_response = response.json()
        return Response(json_response)

class GetSpecificRecipe(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        url = f'https://the-vegan-recipes-db.p.rapidapi.com/{id}'
        headers = {"X-RapidAPI-Key": env.get('R_API_KEY')}
        response = requests.get(url, headers=headers)
        json_response = response.json()
        return Response(json_response)
    
class GetAllRecipes(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        all_recipes = []
        for i in range(1, 8):
            url = f'https://the-vegan-recipes-db.p.rapidapi.com/{i}'
            headers = {"X-RapidAPI-Key": env.get('R_API_KEY')}
            response = requests.get(url, headers=headers)
            json_response = response.json()
            all_recipes.append(json_response)
        return Response(all_recipes)

class AllFavorites(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_recipe, _ = Recipe.objects.get_or_create(app_user=self.request.user)
        user_favs = Favorite.objects.filter(recipe=user_recipe)
        ser_favs = AllFavoriteSerializer(user_favs, many=True)
        serialized_data = ser_favs.data
        return Response(serialized_data, status=HTTP_200_OK)

class AFavorite(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user_recipe = Recipe.objects.get(app_user=self.request.user)
        user_fav = get_object_or_404(Favorite, id=id)
        ser_fav = AFavoriteSerializer(user_fav)
        serialized_data = ser_fav.data
        return Response(serialized_data, status=HTTP_200_OK)

    def delete(self, request, id):
        user_recipe = Recipe.objects.get(app_user=self.request.user)
        user_fav = get_object_or_404(Favorite.objects.filter(dish__contains={"id": str(id)}))
        user_fav.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class AddToFavorites(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        url = f'https://the-vegan-recipes-db.p.rapidapi.com/{id}'
        headers = {"X-RapidAPI-Key": env.get('R_API_KEY')}
        response = requests.get(url, headers=headers)
        json_response = response.json()
        return self.save_favorite(request, json_response)

    def save_favorite(self, request, dish):
        user = request.user
        recipe, created = Recipe.objects.get_or_create(app_user=user)
        favorite, created = Favorite.objects.get_or_create(recipe=recipe, dish=dish)
        if not created:
            return Response("Recipe already in Favorites!", status=HTTP_400_BAD_REQUEST)
        else:
            return Response("Recipe added to Favorites!", status=HTTP_201_CREATED)
        
# class TokenReq(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

# class GetRandomRecipe(TokenReq):
#     def get(self, request):
#         num = random.randint(1, 386)
#         url = f'https://the-vegan-recipes-db.p.rapidapi.com/{num}'
#         headers = {"X-RapidAPI-Key": env.get('R_API_KEY')}
#         response = requests.get(url, headers=headers)
#         json_response = response.json()
#         return Response(json_response)

# class GetSpecificRecipe(TokenReq):
#     def get(self, request, id):
#         url = f'https://the-vegan-recipes-db.p.rapidapi.com/{id}'
#         headers = {"X-RapidAPI-Key": env.get('R_API_KEY')}
#         response = requests.get(url, headers=headers)
#         json_response = response.json()
#         return Response(json_response)
    
# class GetAllRecipes(TokenReq):
#     def get(self, request):
#         all_recipes = []
#         for i in range(1, 8):
#             url = f'https://the-vegan-recipes-db.p.rapidapi.com/{i}'
#             headers = {"X-RapidAPI-Key": env.get('R_API_KEY')}
#             response = requests.get(url, headers=headers)
#             json_response = response.json()
#             all_recipes.append(json_response)
#         return Response(all_recipes)

# class AllFavorites(TokenReq):
#     def get(self, request):
#         user_recipe, _ = Recipe.objects.get_or_create(app_user=self.request.user)
#         user_favs = Favorite.objects.filter(recipe=user_recipe)
#         ser_favs = AllFavoriteSerializer(user_favs, many=True)
#         serialized_data = ser_favs.data
#         return Response(serialized_data, status=HTTP_200_OK)

# class AFavorite(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, id):
#         user_recipe = Recipe.objects.get(app_user=self.request.user)
#         user_fav = get_object_or_404(Favorite, id=id)
#         ser_fav = AFavoriteSerializer(user_fav)
#         serialized_data = ser_fav.data
#         return Response(serialized_data, status=HTTP_200_OK)

#     def delete(self, request, id):
#         user_recipe = Recipe.objects.get(app_user=self.request.user)
#         user_fav = get_object_or_404(Favorite.objects.filter(dish__contains={"id": str(id)}))
#         user_fav.delete()
#         return Response(status=HTTP_204_NO_CONTENT)

# class AddToFavorites(TokenReq):
#     def get(self, request, id):
#         url = f'https://the-vegan-recipes-db.p.rapidapi.com/{id}'
#         headers = {"X-RapidAPI-Key": env.get('R_API_KEY')}
#         response = requests.get(url, headers=headers)
#         json_response = response.json()
#         return self.save_favorite(request, json_response)

#     def save_favorite(self, request, dish):
#         user = request.user
#         recipe, created = Recipe.objects.get_or_create(app_user = user)
#         favorite, created = Favorite.objects.get_or_create(recipe=recipe, dish=dish)
#         if not created:
#             return Response("Recipe already in Favorites!", status=HTTP_400_BAD_REQUEST)
#         else:
#             return Response("Recipe added to Favorites!", status=HTTP_201_CREATED)
