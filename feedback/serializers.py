from rest_framework import serializers
from app.serializers import UserSerializer
from feedback.models import Feedback, Option, Question, FeedbackOption, Promotion


class FeedbackCommentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    objectId = serializers.CharField()
    comment = serializers.CharField()
    branch = serializers.CharField()
    city = serializers.CharField()
    region = serializers.CharField()
    segment = serializers.CharField()
    shift = serializers.CharField()
    user_name = serializers.CharField()
    user_phone = serializers.CharField()
    is_negative = serializers.BooleanField()
    action_taken = serializers.IntegerField()
    email = serializers.CharField()


class FeedbackSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    comment = serializers.CharField(required=False)
    objectId = serializers.CharField()
    gro_name = serializers.CharField(required=False)

    class Meta:
        model = Feedback
        exclude = ('user', 'branch')


class ObjectSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    objectId = serializers.CharField()
        
        
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'text', 'score', 'objectId')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'text', 'isActive', 'type', 'objectId', 'isPromotion', 'promotion')


class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = ('id', 'title', 'isActive', 'objectId')


class FeedbackOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackOption
        fields = ('id')