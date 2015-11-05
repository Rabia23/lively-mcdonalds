from app.models import Region, City, Branch, UserInfo
from django.contrib import admin


class RegionAdmin(admin.ModelAdmin):
    list_display = ('name',)


class CityAdmin(admin.ModelAdmin):
    list_display = ('name',)


class BranchAdmin(admin.ModelAdmin):
    list_display = ('name',)


class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('user_name',)

    def user_name(self, instance):
        return instance.user.first_name


admin.site.register(Region, RegionAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Branch, BranchAdmin)
admin.site.register(UserInfo, UserInfoAdmin)
