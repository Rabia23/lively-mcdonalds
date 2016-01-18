from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.branch.models import Branch
from apps.branch.serializers import BranchSerializer
from apps.city.models import City
from apps.utils import get_data_param
from django.db import transaction


class BranchView(APIView):
    def get(self, request, format=None):
        branches = None
        city_id = request.query_params.get('city', None)
        if city_id:
            city = City.get_by_id(city_id)
            if city:
                branches = city.branches.all()
        else:
            branches = Branch.objects.all()
        serializer = BranchSerializer(branches, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request, format=None):
        name = get_data_param(request, 'name', None)
        city_id = get_data_param(request, 'city_id', None)

        request.data["city"] = city_id
        branch = Branch.get_if_exists(name)
        serializer = BranchSerializer(branch, data=request.data)
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
    #         related_city = city_get(data["city"]["objectId"])
    #         city = City.get_if_exists(related_city["objectId"])
    #
    #         branch_params = data
    #         branch_params['city'] = city.id
    #
    #         branch = Branch.get_if_exists(data["objectId"])
    #         serializer = BranchSerializer(branch, data=data)
    #         return save_and_response(serializer, data)
