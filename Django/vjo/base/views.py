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
        queryset = Activity.objects.all()
        serializer = ActivitySerializer(queryset, many=True)

        return Response(serializer.data)
class AddActivityView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logging.basicConfig(filename='vjo.log', level=logging.ERROR)
        print(f"Reqeust accepted: {request.data}")
        try:
            gpx_file = request.FILES.get('gpx_file')
            gpx = GPX.objects.create(file=gpx_file)
            logging.info('GPX created successfully')
            user_id = request.data.get('user')
            user = User.objects.get(id=user_id)
            activity = Activity.objects.create(name = request.data.get('activityName'), description=request.data.get('description'), user=user, gpx_file = gpx)
            return Response(activity.name)
        except(IntegrityError, ValueError, TypeError) as e:
            logging.error('Error occurred: ',e)
            return Response({'error':e})




