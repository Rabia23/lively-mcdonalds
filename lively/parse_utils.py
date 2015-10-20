__author__ = 'aamish'
from rest_framework import status
from rest_framework.response import Response


def beforeSave(serializer, data):
    if serializer.is_valid():
        serializer.save()
        data = {
            "success": data
        }
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)