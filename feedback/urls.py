from django.conf.urls import url
from feedback import views

urlpatterns = [
    url(r'^feedbacks/$', views.feedback_scores),
]
