from rest_framework import serializers
from apps.region.models import Region

__author__ = 'aamish'


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('id', 'name', 'area')