from rest_framework import serializers
from app.serializers import RegionSerializer, CitySerializer
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


class OverallFeedbackSerializer(serializers.Serializer):
    feedbacks = OverallFeedbackSerializerSingle(many=True)
    feedback_count = serializers.IntegerField()


class RegionFeedbackSerializer(serializers.Serializer):
    region = RegionSerializer()
    data = OverallFeedbackSerializer()


class RegionalAnalysisSerializer(serializers.Serializer):
    region_count = serializers.IntegerField()
    regional_feedbacks = RegionFeedbackSerializer(many=True)


class CityFeedbackSerializer(serializers.Serializer):
    city = CitySerializer()
    data = OverallFeedbackSerializer()


class CityAnalysisSerializer(serializers.Serializer):
    city_count = serializers.IntegerField()
    city_feedbacks = CityFeedbackSerializer(many=True)


class OverallRattingSerializer(serializers.Serializer):
    date = serializers.DateTimeField()
    data = OverallFeedbackSerializer()


