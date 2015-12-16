from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Region, City, Branch, UserInfo, Area
from app.serializers import RegionSerializer, CitySerializer, BranchSerializer, UserInfoSerializer, AreaSerializer
from lively import constants
from lively.parse_utils import region_get, city_get, area_get
from lively.utils import save_and_response, get_related_region, save, response, get_related_city, get_related_area
from django.db import IntegrityError, transaction


@api_view(['GET', 'POST'])
def area(request):

    if request.method == 'GET':
        areas = Area.objects.all()
        serializer = AreaSerializer(areas, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            area = Area.get_if_exists(data["objectId"])
            if region:
                serializer = AreaSerializer(area, data=data)
            else:
                serializer = AreaSerializer(data=data)
            return save_and_response(serializer, data)


@api_view(['GET', 'POST'])
@transaction.atomic
def region(request):

    if request.method == 'GET':
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            related_area = area_get(data["area"]["objectId"])
            area = get_related_area(related_area)

            region_params = data
            region_params['area'] = area.id

            region = Region.get_if_exists(data["objectId"])
            if region:
                serializer = RegionSerializer(region, data=region_params)
                return save_and_response(serializer, data)
            else:
                serializer = RegionSerializer(data=region_params)
                save(serializer)

            return response(data)


@api_view(['GET', 'POST'])
@transaction.atomic
def city(request):

    if request.method == 'GET':
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

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            related_region = region_get(data["region"]["objectId"])
            region = get_related_region(related_region)

            city_params = data
            city_params['region'] = region.id

            city = City.get_if_exists(data["objectId"])
            if city:
                serializer = CitySerializer(city, data=city_params)
                return save_and_response(serializer, data)
            else:
                serializer = CitySerializer(data=city_params)
                save(serializer)

            return response(data)


@api_view(['GET', 'POST'])
@transaction.atomic
def branch(request):

    if request.method == 'GET':
        branches = None
        city_id = request.query_params.get('city', None)
        if city_id:
            city = City.get_by_id(city_id)
            if city:
                branches = city.branches.all()
        else:
            branches = Branch.objects.all()
        serializer = CitySerializer(branches, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            related_city = city_get(data["city"]["objectId"])
            city = get_related_city(related_city)

            branch_params = data
            branch_params['city'] = city.id

            branch = Branch.get_if_exists(data["objectId"])
            if branch:
                serializer = BranchSerializer(branch, data=data)
                return save_and_response(serializer, data)
            else:
                serializer = BranchSerializer(data=data)
                save(serializer)

            return response(data)

@api_view(['GET'])
def user_info(request):

    if request.method == 'GET':
        user_info = UserInfo.objects.all()
        serializer = UserInfoSerializer(user_info, many=True)
        return Response(serializer.data)