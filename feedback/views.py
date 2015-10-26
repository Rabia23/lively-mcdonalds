from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from feedback.models import Feedback
from app.models import Region, City, Branch
from feedback.serializers import FeedbackSerializer
from django.core import serializers
from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
import json


@api_view(['GET', 'POST'])
def feedback_scores(request):

    region_id = request.query_params.get('region', None)
    city_id = request.query_params.get('city', None)
    branch_id = request.query_params.get('branch', None)

    if request.method == 'GET':

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