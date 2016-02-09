from rest_framework.response import Response
from rest_framework.views import APIView
from apps.option.models import Option
from apps.option.serializers import OptionSerializer
from apps.utils import response_json


class OptionView(APIView):
    def get(self, request, format=None):
        options = Option.objects.all()
        serializer = OptionSerializer(options, many=True)
        return Response(response_json(True, serializer.data, None))