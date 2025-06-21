from rest_framework.serializers import ModelSerializer, SerializerMethodField
from base.models import User, Activity, GPX
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
    class Meta:
        model = User
        fields = '__all__'
    def get_friends(self, obj):
        return obj.friends()
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