from rest_framework.response import Response
from rest_framework.views import APIView
from apps import constants
from apps.city.models import City
from apps.city.serializers import CitySerializer
from apps.utils import get_data_param, response_json
from django.db import transaction


class CityView(APIView):
    def get(self, request, format=None):
        region_id = request.query_params.get('region', None)
        if region_id:
            cities = City.objects.filter(region__exact=region_id)
        else:
            cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(response_json(True, serializer.data, None))

    @transaction.atomic
    def post(self, request, format=None):
        name = get_data_param(request, 'name', None)
        region_id = get_data_param(request, 'region_id', None)

        request.data["region"] = region_id
        # city = City.get_if_exists(name) As MC need multiple entries with same name
        serializer = CitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(response_json(True, serializer.data, None))
        return Response(response_json(False, None, constants.TEXT_OPERATION_UNSUCCESSFUL))
