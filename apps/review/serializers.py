from rest_framework import serializers
from apps.review.models import Feedback, FeedbackOption


class FeedbackSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    comment = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    objectId = serializers.CharField()
    gro_name = serializers.CharField(required=False)

    class Meta:
        model = Feedback
        

class FeedbackOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackOption
        fields = ('id', 'feedback', 'option')
