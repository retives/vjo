
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
import logging
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from .models import UserFollowing
from .serializers import *

logger = logging.getLogger(__name__)

class ActivityFeedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetching the activities to display (in future change to access user's and their friends' activities)
        current_user = request.user
        queryset = Activity.objects.all().order_by('-start_time')
        all_activity_serializer = ActivitySerializer(queryset, many=True)
        # Fetching the users for friends suggestions
        suggestion = User.objects.exclude(id=current_user.id)
        user_serializer = UserSerializer(suggestion, many=True)
        data = {
            'activities' : all_activity_serializer.data,
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

            user = request.user
            user_serializer = UserSerializer(user)

            activity = Activity.objects.create(name = request.data.get('activityName'), description=request.data.get('description'), user=user, gpx_file = gpx)
            if activity:
                user.save()
                return Response({
                    'user':user_serializer.data,
                    'activity':activity.name
                })
        except(IntegrityError, ValueError, TypeError) as e:
            logging.error('Error occurred: ',e)
            return Response({'error':e})

class FollowView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_user = request.user
        user_serializer = UserSerializer(current_user)

        following_id = request.data.get("following_id")
        following_user = get_object_or_404(User, id=following_id)

        if not following_id:
            return Response({'error': 'The user does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        if str(current_user.id) == str(following_id):
            return Response({"error": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        created = current_user.follow(following_user)
        # Success
        if created:
            return Response({
                'message':f'{current_user} followed {following_user}',
                'user': user_serializer.data
            },
                status=status.HTTP_201_CREATED)
        else:
            return Response({'message':f'{current_user} already followed {following_user}'}, status=status.HTTP_200_OK)


class UnfollowView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_user = request.user
        user_serializer = UserSerializer(current_user)

        target_id = request.data.get('following_id')
        target_user = get_object_or_404(User, id=target_id)

        deleted = UserFollowing.objects.filter(user=current_user, following_user=target_user).delete()
        if deleted:
            return Response({"message": "Unfollowed successfully", 'user':user_serializer.data}, status=201)
        return Response({"message": "You were not following this user"}, status=400)

class ActivityDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, activity_id):
        activity = Activity.objects.get(id = activity_id)
        activity_serializer = DetailedActivitySerializer(activity)
        if not activity:
            return Response({'error':'Error fetching the activity'})
        return Response({
            'activity':activity_serializer.data
        })
