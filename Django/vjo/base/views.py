from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
import ezgpx

from .serializers import *

class ActivityFeedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetching the activities to display (in future change to access user's and their friends' activities)
        queryset = Activity.objects.all()
        serializer = ActivitySerializer(queryset, many=True)

        return Response(serializer.data)


