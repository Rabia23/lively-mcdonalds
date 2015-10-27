from rest_framework import serializers
from feedback.models import Feedback, FollowupOption, SelectedFollowupOption


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'score', 'comment', 'objectId')
        
        
class FollowupOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowupOption
        fields = ('id', 'text', 'objectId')


class SelectedFollowupOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelectedFollowupOption
        fields = ('id', 'objectId')


class CustomSingleFeedbackSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    score = serializers.IntegerField()


class CustomFeedbackSerializer(serializers.Serializer):
    scores = CustomSingleFeedbackSerializer(many=True)
    scores_count = serializers.IntegerField()