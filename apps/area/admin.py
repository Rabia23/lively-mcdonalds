from django.contrib import admin
from apps.area.models import Area


class AreaAdmin(admin.ModelAdmin):
    pass

admin.site.register(Area, AreaAdmin)