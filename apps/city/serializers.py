from rest_framework import serializers
from apps.city.models import City

__author__ = 'aamish'


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name', 'region')
