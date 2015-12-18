from django.contrib.auth.models import User
from django.db import models


class UserInfo(models.Model):
    phone_no = models.CharField(max_length=20, null=True, blank=True, db_index=True)
    is_customer = models.BooleanField(db_index=True)
    objectId = models.CharField(max_length=20, db_index=True)
    user = models.ForeignKey(User, related_name='info')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.name

    @staticmethod
    def get_if_exists(objectId):
        user_info = UserInfo.objects.filter(objectId=objectId).first()
        if user_info:
            return user_info
