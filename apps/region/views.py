from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.region.models import Region
from apps.region.serializers import RegionSerializer
from apps.utils import get_data_param
from django.db import transaction


class RegionView(APIView):
    def get(self, request, format=None):
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request, format=None):
        name = get_data_param(request, 'name', None)
        area_id = get_data_param(request, 'area_id', None)

        request.data["area"] = area_id
        region = Region.get_if_exists(name)
        serializer = RegionSerializer(region, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # @transaction.atomic
    # def post(self, request, format=None):
    #     data = request.data["object"]
    #     trigger = request.data["triggerName"]
    #
    #     if trigger == constants.TRIGGER_AFTER_SAVE:
    #         related_area = area_get(data["area"]["objectId"])
    #         area = Area.get_if_exists(related_area["objectId"])
    #
    #         region_params = data
    #         region_params['area'] = area.id
    #
    #         region = Region.get_if_exists(data["objectId"])
    #         serializer = RegionSerializer(region, data=region_params)
    #         return save_and_response(serializer, data)
