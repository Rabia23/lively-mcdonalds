from django.contrib import admin
from apps.person.enum import UserRolesEnum
from apps.person.forms import UserInfoForm
from apps.person.models import UserInfo


class ManagersAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'user_role')
    form = UserInfoForm

    def user_role(self, obj):
        return UserRolesEnum.labels[obj.role]

    def user_name(self, obj):
        return obj.user.first_name + " " + obj.user.last_name

    def get_queryset(self, request):
        qs = super(ManagersAdmin, self).get_queryset(request)
        return qs.all().exclude(role=UserRolesEnum.CUSTOMER)

admin.site.register(UserInfo, ManagersAdmin)
