from rest_framework import serializers
from feedback.models import Feedback, Option, Question, FeedbackOption


class FeedbackSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    comment = serializers.CharField(required=False)
    objectId = serializers.CharField()

    class Meta:
        model = Feedback
        exclude = ('user', 'branch')
        
        
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


class PositiveNegativeFeedbackSerializer(serializers.Serializer):
    positive_feedbacks = FeedbackSerializer(many=True)
    negative_feedbacks = FeedbackSerializer(many=True)


class FeedbackCommentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    objectId = serializers.CharField()
    comment = serializers.CharField()
    branch = serializers.CharField()
    city = serializers.CharField()
    region = serializers.CharField()
    user_name = serializers.CharField()
    user_phone = serializers.CharField()
    is_negative = serializers.BooleanField()


class AllCommentsSerializer(serializers.Serializer):
    feedbacks = FeedbackCommentSerializer(many=True)
    feedback_count = serializers.IntegerField()

