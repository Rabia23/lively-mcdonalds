from django.contrib import admin
from app.models import Region, City, Branch, UserInfo


class RegionAdmin(admin.ModelAdmin):
    pass


class CityAdmin(admin.ModelAdmin):
    pass


class BranchAdmin(admin.ModelAdmin):
    pass


class UserInfoAdmin(admin.ModelAdmin):
    pass


admin.site.register(Region, RegionAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Branch, BranchAdmin)
admin.site.register(UserInfo, UserInfoAdmin)
