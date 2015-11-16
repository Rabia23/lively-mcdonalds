from django.contrib.auth.models import User
from django.db import models
from lively import constants


class UserInfo(models.Model):
    user = models.ForeignKey(User, related_name='info', null=True, blank=True)
    phone_no = models.CharField(max_length=20, null=True, blank=True)
    is_customer = models.BooleanField()
    objectId = models.CharField(max_length=20)

    def __unicode__(self):
       return self.name

    @staticmethod
    def get_if_exists(objectId):
        user_info = UserInfo.objects.filter(objectId=objectId).first()
        if user_info:
            return user_info

    def get_username(self):
        if self.user:
            if self.user.first_name:
                if self.user.last_name:
                    return self.user.first_name + " " + self.user.last_name
                return self.user.first_name
        return constants.ANONYMOUS_TEXT

    def get_phone(self):
        if self.phone_no:
            return self.phone_no
        return constants.ANONYMOUS_TEXT


class Region(models.Model):
    name = models.CharField(max_length=20)
    objectId = models.CharField(max_length=20)

    def __unicode__(self):
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

    def __unicode__(self):
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

    def __unicode__(self):
       return self.name

    @staticmethod
    def get_if_exists(objectId):
        branch = Branch.objects.filter(objectId=objectId).first()
        if branch:
            return branch

    def branch_feedback_detail(self):
        try:
            branch = {
                "id": self.id,
                "objectId": self.objectId,
                "name": self.name,
                "latitude": self.latitude,
                "longitude": self.longitude,
                "city": self.city.name,
                "region": self.city.region.name,
                "feedback_count": self.get_branch_feedback_count(),
                "count_exceeded": self.get_branch_feedback_count() >= constants.BRANCH_FEEDBACK_TARGET,
            }
            return branch
        except Exception as e:
            return {}

    def get_branch_feedback_count(self):
        return self.feedback.count()


