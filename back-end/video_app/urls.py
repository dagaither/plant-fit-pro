from django.urls import path
from .views import GetRandomVideo, AddToFavorites, AllFavorites, AFavorite

urlpatterns = [
    path('random/', GetRandomVideo.as_view(), name='random'),
    path('favorite/', AllFavorites.as_view(), name='favorites'),
    path('favorite/<int:id>/', AFavorite.as_view(), name='a_favorite'),
    path('favorite/add/', AddToFavorites.as_view(), name='add_favorite'),
    path('favorite/del/<int:id>/', AFavorite.as_view(), name='delete_fav')
]