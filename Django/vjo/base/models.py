
import os
import uuid
from django.db import models
from datetime import datetime, timedelta, time

def upload_to_profile_images(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('images/profile_images/', new_filename)

def upload_to_gpx(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('gpx/', new_filename)

#Create friendlist and subscribers list
class User(models.Model):
    full_name = models.CharField(max_length=100, null=False)
    email = models.EmailField()
    password = models.CharField(max_length=256, null=False)
    number = models.CharField(max_length=10, null=False)
    profile_image = models.ImageField(upload_to=upload_to_profile_images, null=True, blank=True)

    def __str__(self):
        return f"{self.full_name}"



#Add more info
class Activity(models.Model):
    name = models.CharField(max_length=100, null=False)
    duration = models.TimeField(default = "", blank=True, editable = False, null=False)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name='activities')
    gpx_file = models.FileField(upload_to=upload_to_gpx, null=False)


    def save(self, *args, **kwargs):
        def timedelta_to_time(td: timedelta) -> time:
            total_seconds = int(td.total_seconds())
            hours = (total_seconds // 3600) % 24
            minutes = (total_seconds % 3600) // 60
            seconds = total_seconds % 60
            return time(hour=hours, minute=minutes, second=seconds)

        self.duration = timedelta_to_time(self.end_time - self.start_time)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}, {self.duration}, {self.user}"


class ActivityImage(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/activity_images', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

