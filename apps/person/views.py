from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.person.serializers import UserSerializer
from apps.utils import get_data_param


class UserView(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    # @transaction.atomic()
    # def post(self, request, format=None):
    #     role = get_data_param(request, 'role', None)
    #     first_name = get_data_param(request, 'first_name', None)
    #
    #     # if role == 2:
    #     #     user = User.objects.create(username=self.cleaned_data["username"],
    #     #                                first_name=self.cleaned_data["first_name"],
    #     #                                last_name=self.cleaned_data["last_name"])
    #     #     user.set_password(self.cleaned_data["password"])
    #     #     user.save()
    #     #     user_info.user = user
    #     #     user_info.save()
    #     #
    #     #     if user_info.role == UserRolesEnum.GRO:
    #     #         parse_helper = ParseHelper()
    #     #         parse_helper.item_add(user_info, self.cleaned_data["password"])
    #     #
    #     #     return user_info
    #     #
    #     #
    #     # pass