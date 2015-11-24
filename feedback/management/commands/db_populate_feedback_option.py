from django.core.management.base import BaseCommand
from parse_rest.connection import register
from parse_rest.datatypes import Object
from feedback.models import FeedbackOption, Feedback, Option
from django.conf import settings


class Command(BaseCommand):
    help = 'This Command will take all the data from Parse FeedbackOption table and populate the local Feedback option'\
           ' table'

    def handle(self, *args, **options):
        register(settings.APPLICATION_ID, settings.REST_API_KEY, master_key=settings.MASTER_KEY)
        parse_feedback_option = Object.factory("FeedbackOption")

        all_feedback_options = parse_feedback_option.Query.all().limit(1000)
        while True:
            for feedback_option in all_feedback_options:

                self.stdout.write('ObjectId : ' + feedback_option.objectId + '  Feedback : '
                                  '' + feedback_option.feedback.objectId + ' Option : ' + feedback_option.option.objectId)
                local_fb_option = FeedbackOption(objectId=feedback_option.objectId,
                                                 feedback=Feedback.objects.get(objectId=feedback_option.feedback.objectId),
                                                 option=Option.objects.get(objectId=feedback_option.option.objectId))
                local_fb_option.save()

                #to override auto_now_add=True in model
                local_fb_option.created_at = feedback_option.createdAt
                local_fb_option.save()
            if all_feedback_options.count() <= 1000:
                break
            all_feedback_options = parse_feedback_option.Query.all().skip(1000).limit(1000)

        self.stdout.write('Successfully Populated Feedback Option Table')
