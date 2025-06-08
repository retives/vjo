
import os
import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone
from datetime import datetime, timedelta, time

from base.managers import CustomUserManager


def upload_to_profile_images(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('images/profile_images/', new_filename)

def upload_to_gpx(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('gpx/', new_filename)

#Create friendlist and subscribers list
class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    full_name = models.CharField(max_length=100, null=False)
    email = models.EmailField(unique = True)
    password = models.CharField(max_length=256, null=False)
    number = models.CharField(max_length=10, null=False)
    profile_image = models.ImageField(upload_to=upload_to_profile_images, null=True, blank=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    #Meta fields
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'password']
    EMAIL_FIELD = 'email'

    def has_perm(self, perm, obj=None):
        return self.is_staff or self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_staff or self.is_superuser


    objects = CustomUserManager()
    def __str__(self):
        return f"{self.full_name}"



#Add more info
class Activity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, null=False)
    duration = models.TimeField(blank=True, editable = False, null=False)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities', db_index=True)
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

