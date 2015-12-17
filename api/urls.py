__author__ = 'aamish'

from django.conf.urls import patterns, url

urlpatterns = patterns('api.views',
    url(r'^login/$', 'login', name='login'),
    url(r'^area/$', 'area', name='area'),
    url(r'^region/$', 'region', name='region'),
    url(r'^city/$', 'city', name='city'),
    url(r'^branch/$', 'branch', name='branch'),
    url(r'^overall_feedback/$', 'overall_feedback', name='overall_feedback'),
    url(r'^feedback_analysis/$', 'feedback_analysis', name='feedback_analysis'),
    url(r'^feedback_analysis_breakdown/$', 'feedback_analysis_breakdown', name='feedback_analysis_breakdown'),
    url(r'^overall_rating/$', 'overall_rating', name='overall_rating'),
    url(r'^category_performance/$', 'category_performance', name='category_performance'),
    url(r'^positive_negative_feedback/$', 'positive_negative_feedback', name='positive_negative_feedback'),
    url(r'^comments/$', 'comments', name='comments'),
    url(r'^map_view/$', 'map_view', name='map_view'),
    url(r'^feedback_segmentation/$', 'feedback_segmentation', name='feedback_segmentation'),
    url(r'^top_concerns/$', 'top_concerns', name='top_concerns'),
    url(r'^segmentation_rating/$', 'segmentation_rating', name='segmentation_rating'),
    url(r'^action_taken/$', 'action_taken', name='action_taken'),
    url(r'^action_analysis/$', 'action_analysis', name='action_analysis'),
)



