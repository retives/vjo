import uuid
import ezgpx
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone
from datetime import timedelta
from base.managers import CustomUserManager
from gpxpy import parse
import gpxpy
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import os
import base64
from io import BytesIO
from scipy.stats import zscore

matplotlib.use('Agg')
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

    def get_friends(self):
        return User.objects.filter(
            followers__user=self,
            following__following_user=self
        ).distinct()

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
    def get_total_distance(self):
        return self.activities.aggregate(models.Sum('distance'))

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

    def get_gpx_points(self):
        '''
        Function to parse the points from gpx file attached to it

        Args:
            activity( base.Activity ): Activity type
        Return:
            points( array[(latitude, longitude)...] ): each point of the activity required to plot it on the map
        '''
        with open('media/gpx/' + self.gpx_file.filename()) as f:
            p = parse(f)
            points = [[point.latitude, point.longitude] for route in p.routes for point in route.points] + \
                     [[point.latitude, point.longitude] for track in p.tracks for segment in track.segments for point in
                      segment.points]
            edge_points = [min(points, key=lambda x: x[0]), max(points, key=lambda x: x[0]),
                           min(points, key=lambda x: x[1]), max(points, key=lambda x: x[1])]
            lats, longs = zip(*edge_points)

            avg_lat = sum(lats) / len(lats)
            avg_long = sum(longs) / len(longs)
            centre = (avg_lat, avg_long)

            return {
                'points': points,
                'centre': centre
            }

    def get_speeds(self):
        with open('media/gpx/' + self.gpx_file.filename()) as f:
            gpx = gpxpy.parse(f)
            speeds = []
            times = []
            for track in gpx.tracks:
                for segment in track.segments:
                    for i in range(len(segment.points) - 1):
                        p1 = segment.points[i]
                        p2 = segment.points[i + 1]

                        speed_mps = p1.speed_between(p2)

                        speed_kmh = speed_mps * 3.6 if speed_mps is not None else 0

                        speeds.append(speed_kmh)
                        times.append(p2.time)
            speed_df = pd.DataFrame({'speed': speeds, 'time': times})
            z_scores = zscore(speed_df['speed'])

            threshold = 3
            non_outliers = abs(z_scores) < threshold
            mean_non_outliers = speed_df['speed'][non_outliers].mean()
            speed_df.loc[~non_outliers, 'speed'] = mean_non_outliers
            print(speed_df)
            speed_df['time elapsed'] = (speed_df['time'] - speed_df['time'].iloc[0]).dt.total_seconds() / 60

            plt.figure(figsize=(10, 6))
            plt.plot(speed_df['time elapsed'], speed_df['speed'])
            plt.xlabel('Time elapsed (minutes)')
            plt.ylabel('Speed (km/h)')
            plt.title('Speed over time')

            # Saving to the file

            # if not os.path.exists(f'media/plots/{activity.id}'):
            #     plt.savefig(f'media/plots/{activity.id}')
            #
            # with open(f"data:image/png;base64,{activity.id}") as image:
            #     return image
            #         Saving to the buffer
            buf = BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)

            # Encode as base64
            image_base64 = base64.b64encode(buf.read()).decode('utf-8')
            return f"data:image/png;base64,{image_base64}"

class ActivityImage(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/activity_images', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)



