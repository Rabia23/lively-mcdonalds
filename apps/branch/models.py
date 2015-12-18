from django.db import models
from apps.city.models import City
from django.utils import timezone
from apps import constants
from datetime import datetime


class Branch(models.Model):
    name = models.CharField(max_length=20)
    objectId = models.CharField(max_length=20, db_index=True)
    latitude = models.DecimalField(max_digits=20, decimal_places=16)
    longitude = models.DecimalField(max_digits=20, decimal_places=16)
    city = models.ForeignKey(City, related_name='branches')
    benchmark_count = models.IntegerField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = 'Branch'
        verbose_name_plural = 'Branches'

    def __str__(self):
        return self.name

    @staticmethod
    def get_if_exists(object_id):
        branch = Branch.objects.filter(objectId=object_id).first()
        if branch:
            return branch

    def branch_feedback_detail(self, date_from, date_to):
        feedback_count = self.get_branch_feedback_count(date_from, date_to)
        branch = {
            "id": self.id,
            "objectId": self.objectId,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "city": self.city.name,
            "region": self.city.region.name,
            "feedback_count": feedback_count,
            "count_exceeded": feedback_count >= self.benchmark_count,
        }
        return branch

    def get_branch_feedback_count(self, date_from, date_to):
        if date_to and date_from:
            current_tz = timezone.get_current_timezone()
            date_to = current_tz.localize(datetime.strptime(date_to + " 23:59:59", constants.DATE_FORMAT))
            date_from = current_tz.localize(datetime.strptime(date_from + " 00:00:00", constants.DATE_FORMAT))
            return self.feedback.filter(created_at__gte=date_from, created_at__lte=date_to).count()
        return self.feedback.count()
