from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from base.models import User
from django.core.mail import send_mail
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator as token_generator
from base.serializers import UserSerializer, ActivitySerializer
from django.utils.http import urlsafe_base64_decode

def send_confirmation_email(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)

    confirmation_link = f"http://localhost:8000/confirm-email/{uid}/{token}/"

    send_mail(
        subject="Confirm your registration at Vjo.",
        message=f"Hi {user.username}, click the link to confirm your account:\n{confirmation_link}",
        from_email=None,
        recipient_list=[user.email],
    )

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

                user.is_active = False
                return Response(content)
        except(IntegrityError):
                return Response({'error': 'The email has already been taken!'}, status=422)

def confirm_email(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (User.DoesNotExist, ValueError, TypeError):
        user = None

    if user and token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return Response("Email confirmed. You can now log in.")
    else:
        return Response("Invalid or expired confirmation link.")

class ActivateUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
            return Response({'error': 'Invalid activation link.'}, status=status.HTTP_400_BAD_REQUEST)

        if token_generator.check_token(user, token):
            if not user.is_active:
                user.is_active = True
                user.save()
                return Response({'message': 'User activated successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'User is already active.'}, status=status.HTTP_400_BAD_REQUEST)
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id):
        current_user = User.objects.get(id=user_id)
        user_activities = current_user.activities.all()
        user_serializer = UserSerializer(current_user)
        activity_serializer = ActivitySerializer(user_activities, many=True)
        data = {
            "user":user_serializer.data,
            "activities": activity_serializer.data,
        }

        return Response(data)
