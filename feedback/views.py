from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from feedback.models import Feedback, FollowupOption, SelectedFollowupOption
from feedback.serializers import FeedbackSerializer, CustomFeedbackSerializer, CustomSingleFeedbackSerializer, \
    FollowupOptionSerializer, SelectedFollowupOptionSerializer
from django.core import serializers
from django.http import HttpResponse
from lively import constants
from lively.parse_utils import branch_get, user_get, followup_option_get, feedback_get
from lively.utils import save_and_response, save, response, get_related_branch, get_related_user, \
    get_related_followup_option, get_related_feedback
import json


@api_view(['GET', 'POST'])
def feedback_with_scores(request):

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
        feedback_response = CustomFeedbackSerializer(data)

        return Response(feedback_response.data)

@api_view(['GET', 'POST'])
def feedback(request):

    if request.method == 'GET':
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many=True)
        return Response(serializer.data)

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
        

@api_view(['GET', 'POST'])
def followup_option(request):

    if request.method == 'GET':
        options = FollowupOption.objects.all()
        serializer = FollowupOptionSerializer(options, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            option = FollowupOption.get_if_exists(data["objectId"])
            if option:
                serializer = FollowupOptionSerializer(option, data=data)
                return save_and_response(serializer, data)
            else:
                serializer = FollowupOptionSerializer(data=data)
                option = save(serializer)

                for sub_option in data["subOptions"]:
                    related_option_parse = followup_option_get(sub_option["objectId"])
                    rel_option = get_related_followup_option(related_option_parse)
                    rel_option.parent = option
                    rel_option.save()
            return response(data)


@api_view(['GET', 'POST'])
def selected_followup_option(request):

    if request.method == 'GET':
        selected_options = SelectedFollowupOption.objects.all()
        serializer = SelectedFollowupOptionSerializer(selected_options, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            selected_option = SelectedFollowupOption.get_if_exists(data["objectId"])
            if selected_option:
                serializer = SelectedFollowupOptionSerializer(selected_option, data=data)
                return save_and_response(serializer, data)
            else:
                related_feedback = feedback_get(data["feedback"]["objectId"])
                feedback = get_related_feedback(related_feedback)

                related_followup_option = followup_option_get(data["followupOption"]["objectId"])
                followup_option = get_related_followup_option(related_followup_option)

                serializer = SelectedFollowupOptionSerializer(data=data)
                selected_option = save(serializer)
                selected_option.feedback = feedback
                selected_option.followup_option = followup_option
                selected_option.save()

            return response(data)