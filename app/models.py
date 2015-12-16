from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from lively import constants
from datetime import datetime


class UserInfo(models.Model):
    user = models.ForeignKey(User, related_name='info', null=True, blank=True)
    phone_no = models.CharField(max_length=20, null=True, blank=True)
    is_customer = models.BooleanField()
    objectId = models.CharField(max_length=20)

    def __str__(self):
       return self.name

    @staticmethod
    def get_if_exists(objectId):
        user_info = UserInfo.objects.filter(objectId=objectId).first()
        if user_info:
            return user_info


class Region(models.Model):
    name = models.CharField(max_length=20)
    objectId = models.CharField(max_length=20)

    def __str__(self):
       return self.name

    @staticmethod
    def get_if_exists(objectId):
        region = Region.objects.filter(objectId=objectId).first()
        if region:
            return region

    @staticmethod
    def get_by_id(region_id):
        region = Region.objects.filter(pk=region_id).first() if region_id else None
        if region:
            return region


class City(models.Model):
    name = models.CharField(max_length=20)
    objectId = models.CharField(max_length=20)
    region = models.ForeignKey(Region, related_name='cities', null=True, blank=True)

    class Meta:
        verbose_name = 'City'
        verbose_name_plural = 'Cities'

    def __str__(self):
       return self.name

    @staticmethod
    def get_if_exists(objectId):
        city = City.objects.filter(objectId=objectId).first()
        if city:
            return city

    @staticmethod
    def get_by_id(city_id):
        city = City.objects.filter(pk=city_id).first() if city_id else None
        if city:
            return city


class Branch(models.Model):
    name = models.CharField(max_length=20)
    objectId = models.CharField(max_length=20)
    latitude = models.DecimalField(max_digits=20, decimal_places=16)
    longitude = models.DecimalField(max_digits=20, decimal_places=16)
    user = models.ForeignKey(User, related_name='branches', null=True, blank=True)
    city = models.ForeignKey(City, related_name='branches', null=True, blank=True)
    benchmark_count = models.IntegerField()

    class Meta:
        verbose_name = 'Branch'
        verbose_name_plural = 'Branches'

    def __str__(self):
       return self.name

    @staticmethod
    def get_if_exists(objectId):
        branch = Branch.objects.filter(objectId=objectId).first()
        if branch:
            return branch

    def branch_feedback_detail(self, date_from, date_to):
        try:
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
        except Exception as e:
            return {}

    def get_branch_feedback_count(self, date_from, date_to):
        if date_to and date_from:
            current_tz = timezone.get_current_timezone()
            date_to = current_tz.localize(datetime.strptime(date_to + " 23:59:59", constants.DATE_FORMAT))
            date_from = current_tz.localize(datetime.strptime(date_from + " 00:00:00", constants.DATE_FORMAT))
            return self.feedback.filter(created_at__gte=date_from, created_at__lte=date_to).count()
        return self.feedback.count()


