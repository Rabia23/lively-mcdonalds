from rest_framework.response import Response
from rest_framework.views import APIView
from apps import constants
from apps.region.models import Region
from apps.region.serializers import RegionSerializer
from apps.utils import get_data_param, response_json
from django.db import transaction


class RegionView(APIView):
    def get(self, request, format=None):
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(response_json(True, serializer.data, None))

    @transaction.atomic
    def post(self, request, format=None):
        name = get_data_param(request, 'name', None)
        area_id = get_data_param(request, 'area_id', None)

        request.data["area"] = area_id
        region = Region.get_if_exists(name)
        serializer = RegionSerializer(region, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(response_json(True, serializer.data, None))
        return Response(response_json(False, None, constants.TEXT_OPERATION_UNSUCCESSFUL))

