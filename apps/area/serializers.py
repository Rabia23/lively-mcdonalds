from apps.area.models import Area
from rest_framework import serializers

__author__ = 'aamish'


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ('id', 'name', 'objectId')