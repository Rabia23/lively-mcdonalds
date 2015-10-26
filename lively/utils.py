from django.contrib.auth.models import User
from app.models import Region, City, Branch, UserInfo
from app.serializers import RegionSerializer, CitySerializer, BranchSerializer, UserSerializer, UserInfoSerializer
from rest_framework import status
from rest_framework.response import Response
from lively import constants
import string,random
from lively.parse_utils import region_get

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
#all need to be refactored -  can be converted into one method


def get_related_region(data):
    region = Region.get_if_exists(data["objectId"])
    if region:
        serializer = RegionSerializer(region, data=data)
    else:
        serializer = RegionSerializer(data=data)

    if serializer.is_valid():
        region = serializer.save()
        return region


def get_related_city(data):
    city = City.get_if_exists(data["objectId"])
    if city:
        serializer = CitySerializer(city, data=data)
    else:
        serializer = CitySerializer(data=data)

    if serializer.is_valid():
        city = serializer.save()

        #will use this after testing the nested example otherwise will remove this code
        # related_region = region_get(data["region"]["objectId"])
        # region = get_related_region(related_region)
        #
        # city.region = region
        # city.save()

        return city


def get_related_branch(data):
    branch = Branch.get_if_exists(data["objectId"])
    if branch:
        serializer = BranchSerializer(branch, data=data)
    else:
        serializer = BranchSerializer(data=data)

    if serializer.is_valid():
        branch = serializer.save()
        return branch


def get_related_user(data):
    user_info = UserInfo.get_if_exists(data["objectId"])
    if user_info:
        user_info_serializer = UserInfoSerializer(user_info, data=data)
        user_serializer = UserSerializer(user_info.user, data=data)

        save(user_info_serializer)
        user = save(user_serializer)
        return user
    else:
        data['username'] = generate_username()
        data['password'] = constants.CUSTOMER_PASSWORD

        user_info_serializer = UserInfoSerializer(data=data)
        user_info = save(user_info_serializer)

        if user_info:
            user_serializer = UserSerializer(data=data)
            user = save(user_serializer)

            return associate_info_to_user(user, user_info)


def associate_info_to_user(user, user_info):
    if user:
        user_info.user = user
        user_info.save()

        return user
    else:
        user_info.delete()


#copied
def generate_username():
    # Python 3 uses ascii_letters. If not available, fallback to letters
    try:
        letters = string.ascii_letters
    except AttributeError:
        letters = string.letters
    uname = ''.join([random.choice(letters + string.digits + '_')
                     for i in range(30)])
    try:
        User.objects.get(username=uname)
        return generate_username()
    except User.DoesNotExist:
        return uname

