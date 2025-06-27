from rest_framework.serializers import ModelSerializer, SerializerMethodField
from base.models import User, Activity, GPX, UserFollowing
from gpxpy import parse, gpx
import gpxpy
import pandas as pd
import matplotlib.pyplot as plt
import os
import base64
from io import BytesIO


def get_gpx_points(activity):
    '''
    Function to parse the points from gpx file attached to it

    Args:
        activity( base.Activity ): Activity type
    Return:
        points( array[(latitude, longitude)...] ): each point of the activity required to plot it on the map
    '''
    with open('media/gpx/' + activity.gpx_file.filename()) as f:
        p = parse(f)
        points = [[point.latitude, point.longitude] for route in p.routes for point in route.points] + \
                 [[point.latitude, point.longitude] for track in p.tracks for segment in track.segments for point in
                  segment.points]
        edge_points = [min(points, key=lambda x: x[0]), max(points, key=lambda x: x[0]), min(points, key=lambda x: x[1]), max(points, key=lambda x: x[1])]
        lats, longs = zip(*edge_points)

        avg_lat = sum(lats) / len(lats)
        avg_long = sum(longs) / len(longs)
        centre = (avg_lat, avg_long)

        return {
            'points': points,
            'centre':centre
        }

def get_speeds(activity):
    with open ('media/gpx/'+activity.gpx_file.filename()) as f:
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
        speed_df['time elapsed'] = (speed_df['time'] - speed_df['time'].iloc[0]).dt.total_seconds() / 60
        print(speed_df)

        plt.figure(figsize=(10, 6))
        plt.plot(speed_df['time elapsed'], speed_df['speed'])
        plt.xlabel('Time elapsed (minutes)')
        plt.ylabel('Speed (km/h)')
        plt.title('Speed over time')
        buf = BytesIO()
        buf.seek(0)
        if not os.path.exists(f'media/plots/{activity.id}'):
            plt.savefig(buf, format='png')
        image_base64 = base64.b64encode(buf.read()).decode('utf-8')
        return f"data:image/png;base64,{image_base64}"

class UserSerializer(ModelSerializer):
    following = SerializerMethodField()
    followers = SerializerMethodField()
    activity_amount = SerializerMethodField()
    friends = SerializerMethodField()
    total_distance = SerializerMethodField()
    def get_following(self, obj):
        return SimpleUserSerializer(obj.get_following_users(), many=True).data

    def get_followers(self, obj):
        return SimpleUserSerializer(obj.get_follower_users(), many=True).data

    def get_activity_amount(self, obj):
        return obj.get_activity_amount()

    def get_friends(self, obj):
        return SimpleUserSerializer(obj.get_friends(), many=True).data

    def get_total_distance(self, obj):
        return obj.get_total_distance()

    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'profile_image', 'following', 'followers', 'activity_amount', 'friends', 'total_distance']




class SimpleUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'profile_image']

from rest_framework import serializers

class ActivitySerializer(serializers.ModelSerializer):
    plot_data = serializers.SerializerMethodField()
    user_fullname = serializers.SerializerMethodField()
    speed_plot = serializers.SerializerMethodField()
    class Meta:
        model = Activity
        fields = '__all__'
    def get_plot_data(self, obj):
        return get_gpx_points(obj)
    def get_user_fullname(self, obj):
        return obj.user.full_name
    def get_speed_plot(self, obj):
        return get_speeds(obj)

class GPXSerializer(ModelSerializer):
    formatted_pace = SerializerMethodField()

    class Meta:
        model = GPX
        fields = '__all__'

    def get_formatted_pace(self, obj):
        return obj.formatted_pace()
class UserFollowingSerializer(ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = '__all__'
