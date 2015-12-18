from django.db import models


class Promotion(models.Model):
    title = models.CharField(max_length=255)
    isActive = models.BooleanField(default=True, db_index=True)
    objectId = models.CharField(max_length=20, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.title

    @staticmethod
    def get_if_exists(object_id):
        promotion = Promotion.objects.filter(objectId=object_id).first()
        if promotion:
            return promotion
