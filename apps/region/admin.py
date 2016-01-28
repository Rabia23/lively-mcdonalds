from django.contrib import admin
from apps.region.models import Region


class RegionAdmin(admin.ModelAdmin):
    pass

admin.site.register(Region, RegionAdmin)