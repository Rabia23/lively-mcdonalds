from django.core.management.base import BaseCommand
from parse_rest.connection import register
from parse_rest.datatypes import Object
from app.models import City, Branch
from django.conf import settings


class Command(BaseCommand):
    help = 'This Command will take all the data from Parse Branch table and populate the local Branch table'

    def handle(self, *args, **options):
        register(settings.APPLICATION_ID, settings.REST_API_KEY, master_key=settings.MASTER_KEY)
        self.stdout.write('Populating Branch Table')
        parse_branch = Object.factory("Branch")

        all_branch = parse_branch.Query.all()
        for branch in all_branch:
            self.stdout.write('Name : ' + branch.name + ' ObjectId : ' + branch.objectId + "City ObjectId : " +
                              branch.city.objectId)
            local_branch = Branch(name=branch.name, objectId=branch.objectId,
                                  city=City.objects.get(objectId=branch.city.objectId))
            local_branch.save()

        self.stdout.write('Successfully Populated branch Table')
