from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from feedback.models import Feedback
from feedback.serializers import FeedbackSerializer
from django.core import serializers
from django.http import HttpResponse
from lively import constants
from lively.parse_utils import branch_get, user_get
from lively.utils import save_and_response, save, response, get_related_branch, get_related_user
import json


@api_view(['GET', 'POST'])
def feedback_scores(request):

    if request.method == 'GET':

        region_id = request.query_params.get('region', None)
        city_id = request.query_params.get('city', None)
        branch_id = request.query_params.get('branch', None)

        if region_id and city_id and branch_id:
            scores = Feedback.objects.filter(branch__exact=branch_id, branch__city__exact=city_id, branch__city__region__exact=region_id).\
                values('score').\
                annotate(count=Count('score'))

        elif region_id and city_id:
            scores = Feedback.objects.filter(branch__city__exact=city_id, branch__city__region__exact=region_id).\
                values('score').\
                annotate(count=Count('score'))

        elif region_id:
            scores = Feedback.objects.filter(branch__city__region__exact=region_id).\
                values('score').\
                annotate(count=Count('score'))
        else:
            scores = Feedback.objects.values('score').annotate(count=Count('score'))

        total_scores = Feedback.objects.count()
        data = {'total_count': total_scores, 'scores': list(scores)}
        return HttpResponse(json.dumps(data))

    if request.method == 'POST':

        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            feedback = Feedback.get_if_exists(data["objectId"])
            if feedback:
                serializer = FeedbackSerializer(feedback, data=data)
                return save_and_response(serializer, data)
            else:
                related_branch = branch_get(data["branch"]["objectId"])
                branch = get_related_branch(related_branch)

                related_user = user_get(data["user"]["objectId"])
                user = get_related_user(related_user)

                serializer = FeedbackSerializer(data=data)
                feedback = save(serializer)
                feedback.branch = branch
                feedback.user = user
                feedback.save()

            return response(data)
