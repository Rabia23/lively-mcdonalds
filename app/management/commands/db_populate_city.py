from django.core.management.base import BaseCommand
from parse_rest.connection import register
from parse_rest.datatypes import Object
from app.models import City, Region
from django.conf import settings


class Command(BaseCommand):
    help = 'This Command will take all the data from Parse City table and populate the local City table'

    def handle(self, *args, **options):
        register(settings.APPLICATION_ID, settings.REST_API_KEY, master_key=settings.MASTER_KEY)
        self.stdout.write('Populating City Table')
        parse_city = Object.factory("City")

        all_city = parse_city.Query.all()
        for city in all_city:
            self.stdout.write('Name : ' + city.name + ' ObjectId : ' + city.objectId + "Region ObjectId : " +
                              city.region.objectId)
            local_city = City(name=city.name, objectId=city.objectId,
                              region=Region.objects.get(objectId=city.region.objectId))
            local_city.save()

        self.stdout.write('Successfully Populated City Table')
