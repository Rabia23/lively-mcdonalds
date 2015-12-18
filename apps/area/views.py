from rest_framework.response import Response
from rest_framework.views import APIView
from apps.area.serializers import AreaSerializer
from apps import constants
from apps.utils import save_and_response
from apps.area.models import Area


class AreaView(APIView):
    def get(self, request, format=None):
        areas = Area.objects.all()
        serializer = AreaSerializer(areas, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            area = Area.get_if_exists(data["objectId"])
            serializer = AreaSerializer(area, data=data)
            return save_and_response(serializer, data)