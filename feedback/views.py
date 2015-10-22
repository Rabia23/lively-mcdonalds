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
    if request.method == 'GET':

        scores = Feedback.objects.filter(branch__exact=1, branch__city__exact=1, branch__city__region__exact=1).\
            values('score').\
            annotate(count=Count('score'))

        total_scores = Feedback.objects.count()
        data = {'total_count': total_scores, 'scores': list(scores)}
        return HttpResponse(json.dumps(data))