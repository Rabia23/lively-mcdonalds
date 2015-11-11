__author__ = 'aamish'

from django.conf.urls import patterns, url

urlpatterns = patterns('api.views',
    url(r'^login/$', 'login', name='login'),
    url(r'^region/$', 'region', name='region'),
    url(r'^city/$', 'city', name='city'),
    url(r'^branch/$', 'branch', name='branch'),
    url(r'^overall_feedback/$', 'overall_feedback', name='overall_feedback'),
    url(r'^feedback_analysis/$', 'feedback_analysis', name='feedback_analysis'),
    url(r'^feedback_analysis_breakdown/$', 'feedback_analysis_breakdown', name='feedback_analysis_breakdown'),
    url(r'^overall_rating/$', 'overall_rating', name='overall_rating'),
    url(r'^category_performance/$', 'category_performance', name='category_performance'),
    url(r'^positive_negative_feedback/$', 'positive_negative_feedback', name='positive_negative_feedback'),
)



