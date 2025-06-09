
import os
import uuid

import ezgpx
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


class GPX(models.Model):
    file = models.FileField(upload_to=upload_to_gpx, null=False)
    name = models.CharField(max_length=100, null=False)

    duration = models.DurationField(editable=False, null=False)
    moving_time = models.DurationField(editable=False, null=False)
    start_time = models.DateTimeField(editable=False, null=False)
    end_time = models.DateTimeField(editable=False, null=False)

    distance = models.FloatField(editable=False, null=False)  # in km
    ascent = models.FloatField(editable=False, null=False)    # in m
    descent = models.FloatField(editable=False, null=False)   # in m

    avg_speed = models.FloatField(editable=False, null=False)  # km/h
    min_speed = models.FloatField(editable=False, null=False)
    max_speed = models.FloatField(editable=False, null=False)
    avg_pace = models.FloatField(editable=False, null=False)  # min/km (raw float)

    def save(self, *args, **kwargs):
        gpx = ezgpx.GPX(self.file.path)

        self.name = gpx.name()
        self.duration = gpx.total_elapsed_time()
        self.moving_time = gpx.moving_time()
        self.start_time = gpx.start_time()
        self.end_time = gpx.stop_time()

        self.distance = round(gpx.distance() / 1000, 2)  # km
        self.ascent = round(gpx.ascent(), 1)             # m
        self.descent = round(gpx.descent(), 1)           # m

        self.avg_speed = round(gpx.avg_moving_speed(), 1)
        self.min_speed = round(gpx.min_speed() or 0, 1)
        self.max_speed = round(gpx.max_speed() or 0, 1)

        self.avg_pace = round(gpx.avg_pace(), 2)  # in min/km

        super().save(*args, **kwargs)

    def formatted_pace(self):
        """Returns formatted pace as mm:ss"""
        minutes = int(self.avg_pace)
        seconds = int((self.avg_pace - minutes) * 60)
        return f"{minutes}:{seconds:02d} min/km"

#Add more info
class Activity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities', db_index=True)
    gpx_file = models.OneToOneField(GPX, on_delete=models.CASCADE, related_name='activity')

    def __str__(self):
        return f"{self.user.username}'s activity: {self.gpx_file.name}"



class ActivityImage(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/activity_images', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)



