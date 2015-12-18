from django.db import models
from apps.promotion.models import Promotion


class Question(models.Model):
    text = models.CharField(max_length=255)
    isActive = models.BooleanField(default=True, db_index=True)
    type = models.IntegerField(db_index=True)
    objectId = models.CharField(max_length=20, db_index=True)
    isPromotion = models.BooleanField(default=True, db_index=True)
    promotion = models.ForeignKey(Promotion, related_name='promotion', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.text

    @staticmethod
    def get_if_exists(object_id):
        question = Question.objects.filter(objectId=object_id).first()
        if question:
            return question
