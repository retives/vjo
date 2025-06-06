
from django.db import models


#Create friendlist and subscribers list
class User(models.Model):
    full_name = models.CharField(max_length=100, null=False)
    email = models.EmailField()
    password = models.CharField(max_length=256, null=False)
    number = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.full_name

#Add more info
class Activity(models.Model):
    name = models.CharField(max_length=100, null=False)
    duration = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    gpx_file = models.FileField(upload_to="gpx", null=False)






