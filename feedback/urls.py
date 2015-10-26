from django.conf.urls import patterns, url

urlpatterns = patterns('feedback.views',
       url(r'^feedback/$', 'feedback', name='feedback'),
       url(r'^followup_option/$', 'followup_option', name='followup_option'),
       url(r'^selected_followup_option/$', 'selected_followup_option', name='selected_followup_option'),
       url(r'^feedback_with_scores/$', 'feedback_with_scores', name='feedback_with_scores'),
    )

