from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('activity-feed/', ActivityFeedView.as_view(), name = "activity-feed")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)