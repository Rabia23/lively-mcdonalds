from rest_framework import serializers
from app.serializers import RegionSerializer, CitySerializer, BranchSerializer
from feedback.models import Feedback, Option, Question, FeedbackOption


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'comment', 'objectId')
        
        
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'text', 'score', 'objectId')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'text', 'isActive', 'type', 'objectId')


class FeedbackOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackOption
        fields = ('id', 'objectId')


class OverallFeedbackSerializerSingle(serializers.Serializer):
    count = serializers.IntegerField()
    option_id = serializers.IntegerField()
    option__text = serializers.CharField(max_length=100)
    option__parent_id = serializers.IntegerField(required=False)


class OverallFeedbackSerializer(serializers.Serializer):
    feedbacks = OverallFeedbackSerializerSingle(many=True)
    feedback_count = serializers.IntegerField()


class ObjectSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    objectId = serializers.CharField()


class AnalysisObjectSerializer(serializers.Serializer):
    object = ObjectSerializer()
    data = OverallFeedbackSerializer()


class FeedbackAnalysisSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    analysis = AnalysisObjectSerializer(many=True)


class OverallRattingSerializer(serializers.Serializer):
    date = serializers.DateTimeField()
    data = OverallFeedbackSerializer()


