from django.contrib.auth import authenticate
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

from base.serializers import UserSerializer


# Create your views here.

class LoginView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    def get(self, request):
        return Response()
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print('Done')
        user = authenticate(email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)
            content = {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                "user":serializer.data
            }
            return Response(content)
        else:
            return Response({'error': 'Invalid credentials'}, status = 401)