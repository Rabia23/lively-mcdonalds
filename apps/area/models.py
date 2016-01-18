from django.db import models


class Area(models.Model):
    name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.name

    @staticmethod
    def get_if_exists(name):
        area = Area.objects.filter(name=name).first() if name else None
        return area

    @staticmethod
    def get_by_id(area_id):
        area = Area.objects.filter(pk=area_id).first() if area_id else None
        return area
