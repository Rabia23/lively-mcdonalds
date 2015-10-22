from django.conf.urls import patterns, url

urlpatterns = patterns('feedback.views',
    url(r'^feedback/$', 'feedback', name='feedback'),
    url(r'^api/feedback/$', 'feedback_scores', name='api_feedback'),
)
