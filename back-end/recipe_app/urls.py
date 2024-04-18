from django.urls import path
from .views import GetRandomRecipe, GetSpecificRecipe, GetAllRecipes, AllFavorites, AFavorite, AddToFavorites

urlpatterns = [
    path('', GetRandomRecipe.as_view(), name='rand_recipe'),
    path('all/', GetAllRecipes.as_view(), name='all_recipes'),
    path('<int:id>/', GetSpecificRecipe.as_view(), name='spec_recipe'),
    path('favorite/', AllFavorites.as_view(), name='favorites'),
    path('favorite/<int:id>/', AFavorite.as_view(), name='a_favorite'),
    path('favorite/add/<int:id>/', AddToFavorites.as_view(), name='add_favorite'),
    path('favorite/del/<int:id>/', AFavorite.as_view(), name='del_favorite')
]