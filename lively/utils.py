from app.models import Region
from app.serializers import RegionSerializer
from rest_framework import status
from rest_framework.response import Response

__author__ = 'aamish'

#**************** Generic Util Methods ****************

def save_and_response(serializer, data):
    if serializer.is_valid():
        serializer.save()
        data = {
            "success": data
        }
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def save(serializer):
    if serializer.is_valid():
        return serializer.save()


def response(data):
    data = {
        "success": data
    }
    return Response(data, status=status.HTTP_200_OK)

#**************** Related Objects Methods ****************

def get_related_region(data):
    region = Region.get_if_exists(data["objectId"])
    if region:
        serializer = RegionSerializer(region, data=data)
    else:
        serializer = RegionSerializer(data=data)

    if serializer.is_valid():
        region = serializer.save()
        return region
