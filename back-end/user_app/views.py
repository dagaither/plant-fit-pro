from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from django.core.exceptions import ValidationError
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from .models import App_user

# Create your views here.

class Sign_up(APIView):
    def post(self, request):
        data = request.data.copy()
        email = data.get('email')
        if App_user.objects.filter(email=email).exists():
            return Response({"message": "User with this Email already exists."}, status=HTTP_400_BAD_REQUEST)
        data['username'] = request.data.get('email')
        new_user = App_user(**data)
        try:
            new_user.full_clean()
            new_user.set_password(data.get('password'))
            new_user.save()
            login(request, new_user)
            token = Token.objects.create(user = new_user)
            return Response({'user': new_user.username, 'display_name': new_user.display_name, 'token': token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)

class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get('username', request.data.get('email'))
        user = authenticate(username=data.get('username'), password=data.get('password'))
        print(user)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'user': user.username, 'display_name': user.display_name, 'token': token.key}, status=HTTP_200_OK)
        return Response('No matching user credentials', status=HTTP_400_BAD_REQUEST)

class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)

class Info(TokenReq):
    pass
#     def put(self, request):
#         try:
#             data = request.data.copy()
#             ruser = request.user
#             ruser.display_name = data.get('display_name', ruser.display_name)

class Test(APIView):
    def get(self, request):
        return Response("Success!", status=HTTP_200_OK)

