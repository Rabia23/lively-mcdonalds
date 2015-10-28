from rest_framework import serializers
from feedback.models import Feedback, Option, Question, FeedbackOption


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'comment', 'objectId')
        
        
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'text', 'isNegative', 'objectId')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'text', 'isActive', 'type', 'objectId')


class FeedbackOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackOption
        fields = ('id', 'objectId')


class CustomSingleFeedbackSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    score = serializers.IntegerField()


class CustomFeedbackSerializer(serializers.Serializer):
    scores = CustomSingleFeedbackSerializer(many=True)
    scores_count = serializers.IntegerField()
    
    
class CustomFollowupOptionSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    followup_option = serializers.IntegerField()
    followup_option__text = serializers.CharField()