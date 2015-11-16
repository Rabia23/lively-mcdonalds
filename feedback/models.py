from enum import Enum
from django.contrib.auth.models import User
from django.db import models
from app.models import Branch, UserInfo
from lively import constants


class Feedback(models.Model):
    user = models.ForeignKey(User, related_name='feedback', null=True, blank=True)
    branch = models.ForeignKey(Branch, related_name='feedback', null=True, blank=True)
    comment = models.TextField()
    objectId = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
       return self.objectId

    @staticmethod
    def get_if_exists(objectId):
        feedback = Feedback.objects.filter(objectId=objectId).first()
        if feedback:
            return feedback

    def is_negative(self):
        options = self.feedback_option.filter(option__score__in=constants.NEGATIVE_SCORE_LIST)
        if options:
            return True
        return False

    def customer_name(self):
        if self.user:
            if self.user.first_name:
                return self.user.first_name
        return constants.ANONYMOUS_TEXT

    def customer_phone(self):
        user_info = UserInfo.objects.filter(user=self.user).first()
        if user_info:
            if user_info.phone_no:
                return user_info.phone_no
        return constants.ANONYMOUS_TEXT

    def selected_main_option(self):
        main_question = Question.objects.get(type=constants.MAIN_QUESTION)
        option_list = self.feedback_option.filter(option__in=main_question.options.filter().values_list('id')).values_list('option_id')
        option = Option.objects.filter(pk__in=option_list).first()
        if option:
            return option

    def selected_secondary_option(self):
        secondary_question = Question.objects.get(type=constants.SECONDARY_QUESTION)
        option_list = self.feedback_option.filter(option__in=secondary_question.options.filter().values_list('id')).values_list('option_id')
        options = Option.objects.filter(pk__in=option_list)
        if options:
            return options

    def to_dict(self):
        try:
            feedback = {
                "objectId": self.objectId,
                "comment": self.comment,
                "branch": self.branch.name,
                "city": self.branch.city.name,
                "region": self.branch.city.region.name,
                "main_question_options": self.selected_main_option(),
                "secondary_question_options": self.selected_secondary_option(),
            }
            return feedback
        except Exception as e:
            return {}

    def feedback_comment_dict(self):
        user_info = UserInfo.objects.filter(user=self.user).first()
        try:
            feedback = {
                "id": self.id,
                "objectId": self.objectId,
                "comment": self.comment,
                "branch": self.branch.name,
                "city": self.branch.city.name,
                "region": self.branch.city.region.name,
                "user_name": user_info.get_username() if user_info else None,
                "user_phone": user_info.get_phone() if user_info else None,
                "is_negative": self.is_negative(),
            }
            return feedback
        except Exception as e:
            return {}



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
    score = models.IntegerField(default=0)
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
    created_at = models.DateTimeField(auto_now_add=True)

    def is_negative_option(self):
        if self.option.score in constants.NEGATIVE_SCORE_LIST:
            return True
        return False

    def __unicode__(self):
       return self.objectId

    @staticmethod
    def get_if_exists(objectId):
        feedback_option = FeedbackOption.objects.filter(objectId=objectId).first()
        if feedback_option:
            return feedback_option


