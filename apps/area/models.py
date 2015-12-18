from django.db import models


class Area(models.Model):
    name = models.CharField(max_length=20)
    objectId = models.CharField(max_length=20, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.name

    @staticmethod
    def get_if_exists(object_id):
        area = Area.objects.filter(objectId=object_id).first()
        if area:
            return area

    @staticmethod
    def get_by_id(area_id):
        area = Area.objects.filter(pk=area_id).first() if area_id else None
        if area:
            return area
