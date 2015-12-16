from django.contrib.auth.models import User
from app.models import Region, City, Branch, UserInfo, Area
from rest_framework import serializers

__author__ = 'aamish'


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ('id', 'name', 'objectId')


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('id', 'name', 'objectId', 'area')


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name', 'objectId', 'region')


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'name', 'objectId', 'latitude', 'longitude', 'benchmark_count', 'city')


class UserInfoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    phone_no = serializers.CharField(required=False)

    class Meta:
        model = UserInfo
        fields = ('id', 'objectId', 'is_customer', 'phone_no', 'user')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'password', 'email')


