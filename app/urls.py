__author__ = 'aamish'

from django.conf.urls import patterns, url

urlpatterns = patterns('app.views',
    url(r'^region/$', 'region', name='region'),
    url(r'^city/$', 'city', name='city'),
    url(r'^branch/$', 'branch', name='branch'),
    url(r'^user_info/$', 'user_info', name='user_info'),
)



