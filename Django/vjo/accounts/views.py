from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from base.models import User


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
            return Response({'error': 'Your username or password is wrong.'}, status = 401)

class SignupView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):

        try:
            email = request.data.get('email')
            full_name = request.data.get('full_name')
            password = request.data.get('password')

            user = User.objects.create_user(email=email, password=password, full_name = full_name)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                serializer = UserSerializer(user)
                content = {
                    'access':str(refresh.access_token),
                    'refresh':str(refresh),
                    'user':serializer.data
                }
                return Response(content)

        except(IntegrityError):
                return Response({'error': 'The email has already been taken!'}, status=422)


class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response (status = status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self, request, user_id):
        current_user = User.objects.get(id=user_id)
        serializer = UserSerializer(current_user)
        return Response(serializer.data)