from rest_framework import serializers
from apps.branch.models import Branch

__author__ = 'aamish'


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('id', 'name', 'objectId', 'latitude', 'longitude', 'benchmark_count', 'city')
