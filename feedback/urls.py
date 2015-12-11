from django.conf.urls import patterns, url

urlpatterns = patterns('feedback.views',
       url(r'^feedback/$', 'feedback', name='feedback'),
       url(r'^option/$', 'option', name='option'),
       url(r'^question/$', 'question', name='question'),
       url(r'^feedback_option/$', 'feedback_option', name='feedback_option'),
       url(r'^promotion/$', 'promotion', name='promotion'),
    )

