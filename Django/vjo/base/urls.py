from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('activity-feed/', ActivityFeedView.as_view(), name = "activity-feed"),
    path('add-activity/', AddActivityView.as_view(), name='add-activity')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)