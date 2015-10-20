from rest_framework.decorators import api_view
from rest_framework.response import Response
from lively.parse_utils import beforeSave
from app.models import Region, City
from app.serializers import RegionSerializer, CitySerializer
from lively import constants


@api_view(['GET', 'POST'])
def region(request):

    if request.method == 'GET':
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_BEFORE_SAVE:
            region = Region.get_if_exists(data["objectId"])
            if region:
                serializer = RegionSerializer(region, data=data)
            else:
                serializer = RegionSerializer(data=data)
            return beforeSave(serializer, data)
        elif trigger == constants.TRIGGER_AFTER_SAVE:
            region = Region.get_if_exists(data["objectId"])
            if region:
                serializer = RegionSerializer(region, data=data)
            else:
                serializer = RegionSerializer(data=data)
            return beforeSave(serializer, data)


@api_view(['GET', 'POST'])
def city(request):

    if request.method == 'GET':
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_BEFORE_SAVE:
            city = City.get_if_exists(data["objectId"])
            if city:
                serializer = CitySerializer(city, data=data)
            else:
                serializer = CitySerializer(data=data)
            return beforeSave(serializer, data)