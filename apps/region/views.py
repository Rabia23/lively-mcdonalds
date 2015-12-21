from rest_framework.response import Response
from rest_framework.views import APIView
from apps.area.models import Area
from apps.area.utils import area_get
from apps.region.models import Region
from apps.region.serializers import RegionSerializer
from apps import constants
from apps.utils import save_and_response
from django.db import transaction


class RegionView(APIView):
    def get(self, request, format=None):
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request, format=None):
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            related_area = area_get(data["area"]["objectId"])
            area = Area.get_if_exists(related_area["objectId"])

            region_params = data
            region_params['area'] = area.id

            region = Region.get_if_exists(data["objectId"])
            serializer = RegionSerializer(region, data=region_params)
            return save_and_response(serializer, data)
