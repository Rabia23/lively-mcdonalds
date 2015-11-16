from django.core.management.base import BaseCommand
from parse_rest.connection import register
from parse_rest.datatypes import Object
from feedback.models import Option
from django.conf import settings


class Command(BaseCommand):
    help = 'This Command will take all the data from Parse Option table and populate the local Option table'

    def handle(self, *args, **options):
        register(settings.APPLICATION_ID, settings.REST_API_KEY, master_key=settings.MASTER_KEY)
        parse_option = Object.factory("Option")

        all_options = parse_option.Query.all().limit(10000)
        for option in all_options:

            try:
                score = option.score
            except AttributeError:
                score = 0
            self.stdout.write('ObjectId : ' + option.objectId + '  Text : ' + option.text + ' Score : ' + str(score))
            local_option = Option(objectId=option.objectId, text=option.text, score=score)
            local_option.save()

        for option in all_options:
            try:
                for sub_option in option.subOptions:
                    self.stdout.write("Saving Sub-Options")
                    option_local = Option.objects.get(objectId=sub_option['objectId'])
                    option_local.parent = Option.objects.get(objectId=option.objectId)
                    option_local.save()
            except AttributeError:
                self.stdout.write("No Sub-Options")
        self.stdout.write('Successfully Populated Option Table')
