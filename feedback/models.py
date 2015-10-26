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


class FollowupOption(models.Model):
    text = models.CharField(max_length=20)
    objectId = models.CharField(max_length=20)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children')

    def __unicode__(self):
       return self.text

    @staticmethod
    def get_if_exists(objectId):
        followup_option= FollowupOption.objects.filter(objectId=objectId).first()
        if followup_option:
            return followup_option


class SelectedFollowupOption(models.Model):
    objectId = models.CharField(max_length=20)
    feedback = models.ForeignKey(Feedback, related_name='selected_option', null=True, blank=True)
    followup_option = models.ForeignKey(FollowupOption, related_name='selected_option', null=True, blank=True)

    def __unicode__(self):
       return self.objectId

    @staticmethod
    def get_if_exists(objectId):
        selected_followup_option= SelectedFollowupOption.objects.filter(objectId=objectId).first()
        if selected_followup_option:
            return selected_followup_option

