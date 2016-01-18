from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.city.models import City
from apps.city.serializers import CitySerializer
from apps.region.models import Region
from apps.utils import get_data_param
from django.db import transaction


class CityView(APIView):
    def get(self, request, format=None):
        cities = None
        region_id = request.query_params.get('region', None)
        if region_id:
            region = Region.get_by_id(region_id)
            if region:
                cities = region.cities.all()
        else:
            cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request, format=None):
        name = get_data_param(request, 'name', None)
        region_id = get_data_param(request, 'region_id', None)

        request.data["region"] = region_id
        city = City.get_if_exists(name)
        serializer = CitySerializer(city, data=request.data)
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
    #         related_region = region_get(data["region"]["objectId"])
    #         region = Region.get_if_exists(related_region["objectId"])
    #
    #         city_params = data
    #         city_params['region'] = region.id
    #
    #         city = City.get_if_exists(data["objectId"])
    #         serializer = CitySerializer(city, data=city_params)
    #         return save_and_response(serializer, data)
