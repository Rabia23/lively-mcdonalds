from django.contrib import admin
from apps.promotion.models import Promotion


class PromotionAdmin(admin.ModelAdmin):
    pass

admin.site.register(Promotion, PromotionAdmin)