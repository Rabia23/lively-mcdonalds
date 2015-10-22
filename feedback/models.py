from django.contrib.auth.models import User
from django.db import models
from app.models import Branch


class Feedback(models.Model):
    user = models.ForeignKey(User, related_name='feedback', null=True, blank=True)
    branch = models.ForeignKey(Branch, related_name='feedback', null=True, blank=True)
    comment = models.TextField()
    score = models.IntegerField()
    objectId = models.CharField(max_length=20)

    def __unicode__(self):
       return str(self.score)

    @staticmethod
    def get_if_exists(objectId):
        feedback = Feedback.objects.filter(objectId=objectId).first()
        if feedback:
            return feedback


class Option(models.Model):
    text = models.CharField(max_length=20)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children')


class Question(models.Model):
    text = models.TextField()
    options = models.ManyToManyField(Option)


class SelectedFeedbackOptions(models.Model):
    feedback = models.ForeignKey(Feedback)
    option = models.ForeignKey(Option)


class SelectedFeedbackSubOptions(models.Model):
    selected_feedback_option = models.ForeignKey(SelectedFeedbackOptions)
    option = models.ForeignKey(Option)