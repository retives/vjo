from django.urls import path, include
from .views import *
urlpatterns = [
    path('activity-feed/', ActivityFeedView.as_view(), name = "activity-feed")
]