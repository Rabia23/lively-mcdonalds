from django.conf.urls import patterns, url

urlpatterns = patterns('feedback.views',
       url(r'^feedback/$', 'feedback', name='feedback'),
       url(r'^question/$', 'question', name='question'),
       url(r'^promotion/$', 'promotion', name='promotion'),
    )

