from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
import ezgpx
from gpxpy import parse
from .serializers import *

# Create your views here.
class ActivityFeedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    activity_serializer = ActivitySerializer

    def get(self, request):
        queryset = Activity.objects.all()
        serializer = ActivitySerializer(queryset, many=True)
        return Response(serializer.data)


