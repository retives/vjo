from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging
from django.db import IntegrityError
import ezgpx

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




