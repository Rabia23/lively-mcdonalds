from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Region, City, Branch
from app.serializers import RegionSerializer, CitySerializer, BranchSerializer
from lively import constants
from lively.parse_utils import region_get, city_get
from lively.utils import save_and_response, get_related_region, save, response, get_related_city


@api_view(['GET', 'POST'])
def region(request):

    if request.method == 'GET':
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            region = Region.get_if_exists(data["objectId"])
            if region:
                serializer = RegionSerializer(region, data=data)
            else:
                serializer = RegionSerializer(data=data)
            return save_and_response(serializer, data)


@api_view(['GET', 'POST'])
def city(request):

    if request.method == 'GET':
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            city = City.get_if_exists(data["objectId"])
            if city:
                serializer = CitySerializer(city, data=data)
                return save_and_response(serializer, data)
            else:
                related_region = region_get(data["region"]["objectId"])
                region = get_related_region(related_region)

                serializer = CitySerializer(data=data)
                city = save(serializer)
                city.region = region
                city.save()

            return response(data)


@api_view(['GET', 'POST'])
def branch(request):

    if request.method == 'GET':
        branches = Branch.objects.all()
        serializer = CitySerializer(branches, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            branch = Branch.get_if_exists(data["objectId"])
            if branch:
                serializer = BranchSerializer(branch, data=data)
                return save_and_response(serializer, data)
            else:
                related_city = city_get(data["city"]["objectId"])
                region = get_related_city(related_city)

                serializer = BranchSerializer(data=data)
                branch = save(serializer)
                branch.city = region
                branch.save()

            return response(data)