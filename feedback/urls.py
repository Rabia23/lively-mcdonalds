from django.conf.urls import patterns, url

urlpatterns = patterns('feedback.views',
                       url(r'^feedback/$', 'feedback_scores', name='feedback'),
                       url(r'^api/feedback/$', 'feedback', name='api_feedback'),
)

