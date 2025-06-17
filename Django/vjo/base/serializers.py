from rest_framework.serializers import ModelSerializer, SerializerMethodField
from base.models import User, Activity, GPX

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class ActivitySerializer(ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
    def get_plot(self, activity):
            return activity.get_gpx_points()
class GPXSerializer(ModelSerializer):
    formatted_pace = SerializerMethodField()

    class Meta:
        model = GPX
        fields = '__all__'

    def get_formatted_pace(self, obj):
        return obj.formatted_pace()