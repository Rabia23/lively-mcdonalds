__author__ = 'aamish'

from django.conf.urls import patterns, url
from apps.person import views

urlpatterns = patterns('',
                       url(r'^user/$', views.UserView.as_view()),
                       )
