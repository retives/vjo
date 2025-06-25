from rest_framework.serializers import ModelSerializer, SerializerMethodField
from base.models import User, Activity, GPX, UserFollowing
from gpxpy import parse

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
        return points

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
        return obj.get_friends()

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
    class Meta:
        model = Activity
        fields = '__all__'
    def get_plot_data(self, obj):
        return get_gpx_points(obj)
    def get_user_fullname(self, obj):
        return obj.user.full_name
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
