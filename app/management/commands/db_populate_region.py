from django.core.management.base import BaseCommand
from parse_rest.connection import register
from parse_rest.datatypes import Object
from app.models import Region
from django.conf import settings


class Command(BaseCommand):
    help = 'This Command will take all the data from Parse Region table and populate the local Region table'

    def handle(self, *args, **options):
        register(settings.APPLICATION_ID, settings.REST_API_KEY, master_key=settings.MASTER_KEY)
        parse_region = Object.factory("Region")

        all_region = parse_region.Query.all().limit(10000)
        for region in all_region:
            self.stdout.write('Region : ' + region.name + '  Region Object Id : ' + region.objectId)
            local_region = Region(name=region.name, objectId=region.objectId)
            local_region.save()

        self.stdout.write('Successfully Populated Region Table')
