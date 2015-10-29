__author__ = 'aamish'

from django.conf.urls import patterns, url

urlpatterns = patterns('api.views',
    url(r'^region/$', 'region', name='region'),
    url(r'^city/$', 'city', name='city'),
    url(r'^branch/$', 'branch', name='branch'),
    url(r'^overall_feedback/$', 'overall_feedback', name='overall_feedback'),
    url(r'^regional_analysis/$', 'regional_analysis', name='regional_analysis'),
)



