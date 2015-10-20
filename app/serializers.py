from app.models import Region, City
from rest_framework import serializers

__author__ = 'aamish'


class RegionSerializer(serializers.ModelSerializer):
    """
    Serializing all the Authors
    """
    class Meta:
        model = Region
        fields = ('name', 'objectId')


class CitySerializer(serializers.ModelSerializer):
    """
    Serializing all the Authors
    """
    class Meta:
        model = City
        fields = ('name', 'objectId', 'region')
