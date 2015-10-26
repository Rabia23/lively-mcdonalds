from django.conf.urls import patterns, url

urlpatterns = patterns('feedback.views',
       url(r'^feedback/$', 'feedback', name='feedback'),
       url(r'^feedback_with_scores/$', 'feedback_with_scores', name='feedback_with_scores'),
    )

