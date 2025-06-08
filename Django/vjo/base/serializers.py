from rest_framework.serializers import ModelSerializer
from base.models import User, Activity
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class ActivitySerializer(ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'