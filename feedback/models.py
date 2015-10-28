from enum import Enum
from django.contrib.auth.models import User
from django.db import models
from app.models import Branch


class Feedback(models.Model):
    user = models.ForeignKey(User, related_name='feedback', null=True, blank=True)
    branch = models.ForeignKey(Branch, related_name='feedback', null=True, blank=True)
    comment = models.TextField()
    objectId = models.CharField(max_length=20)

    def __unicode__(self):
       return self.objectId

    @staticmethod
    def get_if_exists(objectId):
        feedback = Feedback.objects.filter(objectId=objectId).first()
        if feedback:
            return feedback


class Question(models.Model):
    text = models.TextField()
    isActive = models.BooleanField(default=True)
    type = models.IntegerField()
    objectId = models.CharField(max_length=20)

    def __unicode__(self):
       return self.text

    @staticmethod
    def get_if_exists(objectId):
        question = Question.objects.filter(objectId=objectId).first()
        if question:
            return question


class Option(models.Model):
    text = models.TextField()
    objectId = models.CharField(max_length=20)
    isNegative = models.BooleanField(default=False)
    question = models.ForeignKey(Question, related_name='options', null=True, blank=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children')

    def __unicode__(self):
       return self.text

    @staticmethod
    def get_if_exists(objectId):
        option = Option.objects.filter(objectId=objectId).first()
        if option:
            return option


class FeedbackOption(models.Model):
    objectId = models.CharField(max_length=20)
    feedback = models.ForeignKey(Feedback, related_name='feedback_option', null=True, blank=True)
    option = models.ForeignKey(Option, related_name='feedback_option', null=True, blank=True)

    def __unicode__(self):
       return self.objectId

    @staticmethod
    def get_if_exists(objectId):
        feedback_option = FeedbackOption.objects.filter(objectId=objectId).first()
        if feedback_option:
            return feedback_option


