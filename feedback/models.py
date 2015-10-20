from django.contrib.auth.models import User
from django.db import models
from app.models import Devices


class Option(models.Model):
    text = models.CharField(max_length=20)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children')


class Question(models.Model):
    text = models.TextField()
    options = models.ManyToManyField(Option)


class Feedback(models.Model):
    user = models.ForeignKey(User)
    device = models.ForeignKey(Devices)
    comment = models.TextField()
    score = models.IntegerField()


class SelectedFeedbackOptions(models.Model):
    feedback = models.ForeignKey(Feedback)
    option = models.ForeignKey(Option)


class SelectedFeedbackSubOptions(models.Model):
    selected_feedback_option = models.ForeignKey(SelectedFeedbackOptions)
    option = models.ForeignKey(Option)