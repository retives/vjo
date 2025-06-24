
import os
import uuid

import ezgpx
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone
from datetime import datetime, timedelta, time
from base.managers import CustomUserManager
from django.core.exceptions import ObjectDoesNotExist

def upload_to_profile_images(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('images/profile_images/', new_filename)

def upload_to_gpx(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('gpx/', new_filename)

class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    full_name = models.CharField(max_length=100, null=False)
    email = models.EmailField(unique = True)
    password = models.CharField(max_length=256, null=False)
    number = models.CharField(max_length=10, blank=True, null=True)
    profile_image = models.ImageField(upload_to=upload_to_profile_images, null=True, blank=True)
    
    def get_following_users(self):
        return User.objects.filter(followers__user=self)

    def get_follower_users(self):
        return User.objects.filter(following__following_user=self)

    def follow(self, target_user):
        if self == target_user:
            raise ValueError("Cannot follow yourself")
        return UserFollowing.objects.get_or_create(user=self, following_user=target_user)
    def get_activity_amount(self):
        return self.activities.all().count()
    def unfollow(self, target_user):
        UserFollowing.objects.filter(user=self, following_user=target_user).delete()

    def is_following(self, target_user):
        return UserFollowing.objects.filter(user=self, following_user=target_user).exists()

    def is_followed_by(self, target_user):
        return UserFollowing.objects.filter(user=target_user, following_user=self).exists()
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

class UserFollowing(models.Model):
    # class Meta:
    #     constraints = [
    #         models.UniqueConstraint(fields=['user_id', 'following_user_id'], name='unique_following'),
    #     ]

    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name='following')
    following_user= models.ForeignKey("User", on_delete=models.CASCADE, related_name='followers')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.following_user}'



class GPX(models.Model):
    file = models.FileField(upload_to=upload_to_gpx, null=False)
    def filename(self):
        return os.path.basename(self.file.name)

#Add more info
class Activity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField(null = True, blank = True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities', db_index=True)
    gpx_file = models.OneToOneField(GPX, on_delete=models.CASCADE, related_name='activity')
    name = models.CharField(max_length=100, default = 'Activity')

    duration = models.DurationField(editable=False,default=timedelta)
    moving_time = models.DurationField(editable=False, default = timedelta)
    start_time = models.DateTimeField(editable=False, default = timezone.now)
    end_time = models.DateTimeField(editable=False, default = timezone.now)

    distance = models.FloatField(editable=False, default = 0.0)  # in km
    ascent = models.FloatField(editable=False, default = 0.0)    # in m
    descent = models.FloatField(editable=False, default = 0.0)   # in m

    avg_speed = models.FloatField(editable=False, default = 0.0)  # km/h
    min_speed = models.FloatField(editable=False, default = 0.0)
    max_speed = models.FloatField(editable=False, default = 0.0)
    avg_pace = models.FloatField(editable=False, default = 0.0)  # min/km (raw float)



    def __str__(self):
        return f"{self.user.full_name}'s activity: {self.name}"

    def save(self, *args, **kwargs):
        gpx = ezgpx.GPX(self.gpx_file.file.path)

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

class ActivityImage(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/activity_images', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)



