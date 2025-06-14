from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *

# Create your views here.
class ActivityFeedView(APIView):
    activity_serializer = ActivitySerializer

    def get(self, request):
        queryset = Activity.objects.all()
        serializer = ActivitySerializer(queryset, many=True)
        return Response(serializer.data)
