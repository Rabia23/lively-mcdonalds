from django.db import models
from apps.area.models import Area


class Region(models.Model):
    name = models.CharField(max_length=20)
    area = models.ForeignKey(Area, related_name='regions')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.name

    @staticmethod
    def get_if_exists(name):
        region = Region.objects.filter(name=name).first()
        if region:
            return region

    @staticmethod
    def get_by_id(region_id):
        region = Region.objects.filter(pk=region_id).first() if region_id else None
        if region:
            return region