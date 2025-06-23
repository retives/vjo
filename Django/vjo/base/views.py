
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
import logging
from django.db import IntegrityError


from .serializers import *

logger = logging.getLogger(__name__)

class ActivityFeedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetching the activities to display (in future change to access user's and their friends' activities)
        current_user = request.user
        queryset = current_user.activities.all().order_by('-start_time')
        activity_serializer = ActivitySerializer(queryset, many=True)
        # Fetching the users for friends suggestions
        suggestion = User.objects.exclude(id=current_user.id)
        user_serializer = UserSerializer(suggestion, many=True)
        data = {
            'activities' : activity_serializer.data,
            'suggestions': user_serializer.data,
        }
        return Response(data)

class AddActivityView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(f"Reqeust accepted: {request.data}")
        try:
            gpx_file = request.FILES.get('gpx_file')
            gpx = GPX.objects.create(file=gpx_file)

            user_id = request.data.get('user')
            user = User.objects.get(id=user_id)

            activity = Activity.objects.create(name = request.data.get('activityName'), description=request.data.get('description'), user=user, gpx_file = gpx)

            return Response(activity.name)
        except(IntegrityError, ValueError, TypeError) as e:
            logging.error('Error occurred: ',e)
            return Response({'error':e})

class FollowView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_user = request.user
        following_id = request.data.get("following_id")
        print(request.user)
        if not following_id:
            return Response({'error': 'The user does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        if str(current_user.id) == str(following_id):
            return Response({"error": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        result = current_user.follow(following_id)
        return Response(result, status=status.HTTP_201_CREATED)

class UnfollowView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.user)
        current_user = request.user
        following_id = request.data.get("following_id")

        if not following_id:
            return Response({'error': 'The user does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        if str(current_user.id) == str(following_id):
            return Response({"error": "You cannot unfollow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        result = current_user.unfollow(following_id)
        return Response(result, status=status.HTTP_201_CREATED)

