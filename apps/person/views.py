from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.response import Response
from rest_framework.views import APIView
from apps import constants
from apps.branch.models import Branch
from apps.parse import ParseHelper
from apps.person.enum import UserRolesEnum
from apps.person.models import UserInfo
from apps.region.models import Region
from apps.utils import get_data_param, get_param, get_default_param
from django.db import IntegrityError


class UserView(APIView):
    def get(self, request, format=None):
        role = get_param(request, 'role', None)
        id = get_param(request, 'id', None)
        director_id = get_param(request, 'director_id', None)
        assistant_director_id = get_param(request, 'assistant_director_id', None)
        operational_manager_id = get_param(request, 'operational_manager_id', None)
        operational_consultant_id = get_param(request, 'operational_consultant_id', None)
        branch_manager_id = get_param(request, 'branch_manager_id', None)

        if id:
            data = UserInfo.get_person_dict(int(role), id)
        elif director_id:
            data = UserInfo.get_children_dict(UserRolesEnum.ASSISTANT_DIRECTOR, UserRolesEnum.DIRECTOR, director_id)
        elif assistant_director_id:
            data = UserInfo.get_children_dict(UserRolesEnum.OPERATIONAL_MANAGER, UserRolesEnum.ASSISTANT_DIRECTOR, assistant_director_id)
        elif operational_manager_id:
            data = UserInfo.get_children_dict(UserRolesEnum.OPERATIONAL_CONSULTANT, UserRolesEnum.OPERATIONAL_MANAGER, operational_manager_id)
        elif operational_consultant_id:
            data = UserInfo.get_children_dict(UserRolesEnum.BRANCH_MANAGER, UserRolesEnum.OPERATIONAL_CONSULTANT, operational_consultant_id)
        elif branch_manager_id:
            data = UserInfo.get_children_dict(UserRolesEnum.GRO, UserRolesEnum.BRANCH_MANAGER, branch_manager_id)
        else:
            data = UserInfo.get_people_dict(int(role))

        return Response(data)

    @transaction.atomic()
    def post(self, request, format=None):
        try:
            role = get_data_param(request, 'role', None)
            username = get_data_param(request, 'username', None)
            first_name = get_data_param(request, 'first_name', None)
            last_name = get_data_param(request, 'last_name', None)
            password = get_data_param(request, 'password', None)
            email = get_data_param(request, 'email', None)
            phone_no = get_data_param(request, 'phone_no', None)
            branch_id = get_data_param(request, 'branch_id', None)
            region_id = get_data_param(request, 'region_id', None)
            parent_id = get_data_param(request, 'parent_id', None)

            if role:
                branch = Branch.objects.get(pk=branch_id) if branch_id else None
                parent_user = User.objects.get(pk=parent_id) if parent_id else None
                parent = parent_user.info.first() if parent_user else None
                region = Region.objects.get(pk=region_id) if region_id else None

                user = User.objects.create(username=username, first_name=first_name, last_name=last_name, email=email)
                user.set_password(password)
                user.save()

                if branch and parent:
                    if role == UserRolesEnum.GRO:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no, role=UserRolesEnum.GRO,
                                                            branch=branch, parent=parent)
                        parse_helper = ParseHelper()
                        parse_helper.item_add(user_info, password)
                        return Response(user_info.to_dict())
                    elif role == UserRolesEnum.BRANCH_MANAGER:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no, role=UserRolesEnum.BRANCH_MANAGER,
                                                        branch=branch, parent=parent)
                        return Response(user_info.to_dict())
                elif region and parent:
                    if role == UserRolesEnum.OPERATIONAL_CONSULTANT:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no, role=UserRolesEnum.OPERATIONAL_CONSULTANT,
                                                        region=region, parent=parent)
                        return Response(user_info.to_dict())
                elif parent:
                    if role == UserRolesEnum.OPERATIONAL_MANAGER:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no,
                                            role=UserRolesEnum.OPERATIONAL_MANAGER, parent=parent)
                        return Response(user_info.to_dict())
                    elif role == UserRolesEnum.ASSISTANT_DIRECTOR:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no,
                                            role=UserRolesEnum.ASSISTANT_DIRECTOR, parent=parent)
                        return Response(user_info.to_dict())
                else:
                    if role == UserRolesEnum.DIRECTOR:
                        user_info = UserInfo.objects.create(user=user, phone_no=phone_no, role=UserRolesEnum.DIRECTOR)
                        return Response(user_info.to_dict())

            return Response(False)
        except IntegrityError as e:
            return Response(constants.TEXT_ALREADY_EXISTS)


    @transaction.atomic()
    def put(self, request, format=None):
        try:
            id = get_data_param(request, 'id', None)
            new_password = get_data_param(request, 'new_password', None)
            email = get_data_param(request, 'email', None)
            phone_no = get_data_param(request, 'phone_no', None)

            user = User.objects.get(pk=id)
            if user:
                user.email = email if email else user.email
                if new_password:
                    user.set_password(new_password)
                user.save()

            user_info = user.info.first()
            if user_info:
                user_info.phone_no = phone_no if phone_no else user_info.phone_no
                user_info.save()

            return Response(user_info.to_dict())

        except User.DoesNotExist as e:
            return Response(constants.TEXT_DOES_NOT_EXISTS)


    @transaction.atomic()
    def delete(self, request, format=None):
        try:
            id = get_default_param(request, 'id', None)

            user = User.objects.get(pk=id)
            if user:
                user_info = user.info.first()
                if user_info:
                    if user_info.is_active:
                        user_info.is_active = False
                    else:
                        user_info.is_active = True
                    user_info.save()
                    return Response(user_info.to_dict)

            return Response(False)
        except User.DoesNotExist as e:
            return Response(constants.TEXT_DOES_NOT_EXISTS)