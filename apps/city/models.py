from django.db import models
from apps.region.models import Region


class City(models.Model):
    name = models.CharField(max_length=20)
    region = models.ForeignKey(Region, related_name='cities')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = 'City'
        verbose_name_plural = 'Cities'

    def __str__(self):
        return self.name

    @staticmethod
    def get_if_exists(name):
        city = City.objects.filter(name=name).first()
        if city:
            return city

    @staticmethod
    def get_by_id(city_id):
        city = City.objects.filter(pk=city_id).first() if city_id else None
        if city:
            return city
