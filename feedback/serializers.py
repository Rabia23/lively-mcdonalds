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
        fields = ('id')


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
    date = serializers.CharField()
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
    segment = serializers.CharField()
    shift = serializers.CharField()
    user_name = serializers.CharField()
    user_phone = serializers.CharField()
    is_negative = serializers.BooleanField()
    action_taken = serializers.BooleanField()


class AllCommentsSerializer(serializers.Serializer):
    feedbacks = FeedbackCommentSerializer(many=True)
    feedback_count = serializers.IntegerField()


class MapViewBranchSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    objectId = serializers.CharField()
    name = serializers.CharField()
    latitude = serializers.CharField()
    longitude = serializers.CharField()
    city = serializers.CharField()
    region = serializers.CharField()
    feedback_count = serializers.IntegerField()
    count_exceeded = serializers.BooleanField()


class AllBranchesSerializer(serializers.Serializer):
    branches = MapViewBranchSerializer(many=True)
    branch_count = serializers.IntegerField()


class SegmentCountSerializer(serializers.Serializer):
    segment = serializers.CharField()
    option_count = serializers.IntegerField()


class SegmentSerializer(serializers.Serializer):
    option__text = serializers.CharField()
    option_id = serializers.IntegerField()
    segment_list = SegmentCountSerializer(many=True)


class SegmentationSerializer(serializers.Serializer):
    options = SegmentSerializer(many=True)
    option_count = serializers.IntegerField()


class ConcernSerializer(serializers.Serializer):
    name = serializers.CharField()
    weight = serializers.IntegerField()


class ConcernsSerializer(serializers.Serializer):
    concern_list = ConcernSerializer(many=True)
    concern_count = serializers.IntegerField()


class SegmentOptionSerializer(serializers.Serializer):
    segment = serializers.CharField()
    option_count = serializers.IntegerField()
    option_data = OverallFeedbackSerializerSingle(many=True)


class SegmentationRatingSerializer(serializers.Serializer):
    segments = SegmentOptionSerializer(many=True)
    segment_count = serializers.IntegerField()


class ActionTakenObjectSerializer(serializers.Serializer):
    action_taken = serializers.BooleanField()
    count = serializers.IntegerField()


class ActionTakenSerializer(serializers.Serializer):
    feedback_count = serializers.IntegerField()
    action_analysis = ActionTakenObjectSerializer(many=True)


class ActionAnalysisObjectSerializer(serializers.Serializer):
    object = ObjectSerializer()
    data = ActionTakenSerializer()


class ActionAnalysisSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    analysis = ActionAnalysisObjectSerializer(many=True)