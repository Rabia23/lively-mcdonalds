from django.contrib import admin
from app.models import Region, City


class RegionAdmin(admin.ModelAdmin):
    pass


class CityAdmin(admin.ModelAdmin):
    pass


admin.site.register(Region, RegionAdmin)
admin.site.register(City, CityAdmin)
