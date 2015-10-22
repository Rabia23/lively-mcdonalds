from django.contrib.auth.models import User
from django.db import models


class UserInfo(models.Model):
    user = models.ForeignKey(User, related_name='info')
    phone_no = models.CharField(max_length=20)
    is_customer = models.BooleanField()
    objectId = models.CharField(max_length=20)

    def __unicode__(self):
       return self.name

    @staticmethod
    def get_if_exists(objectId):
        user_info = UserInfo.objects.filter(objectId=objectId).first()
        if user_info:
            return user_info


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


class Branch(models.Model):
    name = models.CharField(max_length=20)
    objectId = models.CharField(max_length=20)
    user = models.ForeignKey(User, related_name='branches', null=True, blank=True)
    city = models.ForeignKey(City, related_name='branches', null=True, blank=True)

    def __unicode__(self):
       return self.name

    @staticmethod
    def get_if_exists(objectId):
        branch = Branch.objects.filter(objectId=objectId).first()
        if branch:
            return branch


