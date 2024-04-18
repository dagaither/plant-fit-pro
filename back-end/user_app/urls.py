from django.urls import path
from .views import Sign_up, Log_in, Log_out, Info, Test

urlpatterns = [
    path('signup/', Sign_up.as_view()),
    path('login/', Log_in.as_view()),
    path('logout/', Log_out.as_view()),
    path('info/', Info.as_view()),
    path('test/', Test.as_view())
]