from django.contrib import admin
from models import UserProfile
# Register your models here.
class userProfileAdmin(admin.ModelAdmin):
    fields = ('user','groups')

admin.site.register(UserProfile,userProfileAdmin)