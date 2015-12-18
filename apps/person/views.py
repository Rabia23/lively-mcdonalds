from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.person.serializers import UserSerializer


class UserView(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)