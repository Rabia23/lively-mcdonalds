from rest_framework import serializers
from feedback.models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'score', 'comment', 'objectId')


class CustomSingleFeedbackSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    score = serializers.IntegerField()


class CustomFeedbackSerializer(serializers.Serializer):
    scores = CustomSingleFeedbackSerializer(many=True)
    total_count = serializers.IntegerField()