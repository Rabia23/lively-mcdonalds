from django.core.management.base import BaseCommand
from parse_rest.connection import register
from parse_rest.datatypes import Object
from feedback.models import Question, Option
from django.conf import settings


class Command(BaseCommand):
    help = 'This Command will take all the data from Parse Question table and populate the local Question table'

    def handle(self, *args, **options):
        register(settings.APPLICATION_ID, settings.REST_API_KEY, master_key=settings.MASTER_KEY)
        parse_question = Object.factory("Question")

        all_question = parse_question.Query.all()
        for question in all_question:
            self.stdout.write('ObjectId : ' + question.objectId + '  IsActive : ' + str(question.isActive) + ' type : '
                              '' + str(question.type) + ' text : ' + question.text)
            local_question = Question(objectId=question.objectId, isActive=question.isActive, type=question.type,
                                      text=question.text)
            local_question.save()
            for option in question.options:
                local_option = Option.objects.get(objectId=option['objectId'])
                local_option.question = Question.objects.get(objectId=question.objectId)
                local_option.save()
        self.stdout.write('Successfully Populated Question Table')
