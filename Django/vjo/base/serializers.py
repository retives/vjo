from rest_framework.serializers import ModelSerializer, SerializerMethodField
from base.models import User, Activity, GPX, UserFollowing

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
    user_fullname = serializers.SerializerMethodField()
    plot_data = serializers.SerializerMethodField()
    class Meta:
        model = Activity
        fields = ['id', 'name', 'distance', 'start_time', 'end_time', 'user_fullname', 'plot_data']
    def get_plot_data(self, obj):
        return obj.get_gpx_points()
    def get_user_fullname(self, obj):
        return obj.user.full_name
class DetailedActivitySerializer(serializers.ModelSerializer):
    speed_plot = serializers.SerializerMethodField()
    user_fullname = serializers.SerializerMethodField()
    plot_data = serializers.SerializerMethodField()
    class Meta:
        model = Activity
        fields = ActivitySerializer.Meta.fields + [
            'description', 'ascent', 'descent',
            'avg_speed', 'max_speed', 'min_speed', 'avg_pace',
            'gpx_file', 'user', 'plot_data', 'speed_plot',
        ]
    def get_speed_plot(self, obj):
        return obj.get_speeds()
    def get_plot_data(self, obj):
        return obj.get_gpx_points()
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
