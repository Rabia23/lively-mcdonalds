from django.contrib.auth.models import User
from app.models import Region, City, Branch, UserInfo
from rest_framework import serializers

__author__ = 'aamish'


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('id', 'name', 'objectId')


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name', 'objectId')


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'name', 'objectId')
        

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('objectId', 'is_customer', 'phone_no')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'password')
