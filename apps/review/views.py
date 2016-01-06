from django.db import transaction
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.branch.models import Branch
from apps.branch.utils import branch_get
from apps.option.utils import option_get, get_related_option
from apps.person.utils import user_get, get_related_user
from apps.review.models import Feedback, FeedbackOption
from apps.review.serializers import FeedbackSerializer
from apps.review.utils import send_negative_feedback_email
from apps import constants
from apps.utils import save, response
from django.template import Context
from apps.redis_queue import RedisQueue


class FeedbackView(APIView):
    def get(self, request, format=None):
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many=True)
        return Response(serializer.data)


    @transaction.atomic
    def post(self, request, format=None):
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            related_branch = branch_get(data["branch"]["objectId"])
            branch = Branch.get_if_exists(related_branch["objectId"])

            if "user" in data:
                related_user = user_get(data["user"]["objectId"])
                user = get_related_user(related_user)
            else:
                user = None

            feedback_params = data
            feedback_params['user'] = user.id if user else None
            feedback_params['branch'] = branch.id

            feedback = Feedback.get_if_exists(data["objectId"])
            serializer = FeedbackSerializer(feedback, data=feedback_params)
            feedback = save(serializer)

            if "options" in data:
                for option_data in data["options"]:
                    option_parse = option_get(option_data["objectId"])
                    option = get_related_option(option_parse)

                    feedback_option = FeedbackOption.get_if_exists(feedback.id, option.id)
                    if not feedback_option:
                        FeedbackOption(feedback=feedback, option=option).save()


            q = RedisQueue('feedback_queue')
            q.put("ping")


            if feedback.is_negative():
                context = Context({'feedback': feedback})
                send_negative_feedback_email(context)

            return response(data)




