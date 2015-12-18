__author__ = 'aamish'

from django.conf.urls import patterns, url
from apps.promotion import views

urlpatterns = patterns('',
                       url(r'^promotion/$', views.PromotionView.as_view()),
                       )
