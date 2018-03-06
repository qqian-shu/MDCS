
from django.conf.urls import patterns, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^userGroup','provide.views.group'),
    url(r'^createGroup','provide.views.create_group'),
    url(r'^groups','provide.views.group_detail'),
    url(r'^manageGroup','provide.views.delete_group'),#by wuzhenzhen
    url(r'^joinGroup','provide.views.add_user_to_group_view'),#by wuzhenzhen
    url(r'^removeUserfromGroup','provide.views.remove_user_from_group_view'),#by wuzhenzhen
    url(r'^leaveGroup','provide.views.leave_group'),#by wuzhenzhen

)+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += staticfiles_urlpatterns()