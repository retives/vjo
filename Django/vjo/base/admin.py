from django.contrib import admin
from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name', "activities"]

admin.site.register(User)
admin.site.register(Activity)