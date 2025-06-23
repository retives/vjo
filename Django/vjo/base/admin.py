from django.contrib import admin
from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    model = User
    filter_horizontal = ('following',)
    list_display = ('email', 'full_name')

admin.site.register(User)
admin.site.register(Activity)
admin.site.register(ActivityImage)
admin.site.register(GPX)