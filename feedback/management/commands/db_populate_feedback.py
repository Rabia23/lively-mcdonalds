from django.core.management.base import BaseCommand
from parse_rest.connection import register
from parse_rest.datatypes import Object
from feedback.models import Feedback
from app.models import Branch, UserInfo
from django.conf import settings


class Command(BaseCommand):
    help = 'This Command will take all the data from Parse Feedback table and populate the local Feedback table'

    def handle(self, *args, **options):
        register(settings.APPLICATION_ID, settings.REST_API_KEY, master_key=settings.MASTER_KEY)
        parse_feedback = Object.factory("Feedback")

        all_feedback = parse_feedback.Query.all().limit(10000)
        for feedback in all_feedback:
            comment = feedback.comment if hasattr(feedback, 'comment') else ''
            self.stdout.write('ObjectId : ' + feedback.objectId + '  Branch : ' + feedback.branch.name + ' Comment : '
                                                                                                         '' + comment)
            if hasattr(feedback, 'user'):
                user = UserInfo.objects.get(objectId=feedback.user.objectId).user
                local_feedback = Feedback(objectId=feedback.objectId, comment=comment, user=user,
                                      branch=Branch.objects.get(objectId=feedback.branch.objectId))
            else:
                local_feedback = Feedback(objectId=feedback.objectId, comment=comment,
                                      branch=Branch.objects.get(objectId=feedback.branch.objectId))
            local_feedback.save()

            #to override auto_now_add=True in model
            local_feedback.created_at = feedback.createdAt
            local_feedback.save()


        self.stdout.write('Successfully Populated FeedBack Table')
