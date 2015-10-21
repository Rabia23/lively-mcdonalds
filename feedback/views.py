from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from feedback.models import Feedback
from app.models import City,Region,Branch,Devices
from feedback.serializers import FeedbackSerializer
from django.core import serializers
from django.http import HttpResponse
import json


@api_view(['GET', 'POST'])
def feedback_scores(request):
    if request.method == 'GET':

        # region = request.GET['region']
        # city = request.GET['city']
        # branch = request.GET['branch']

        #dummy data
        city = 1  # city = "lahore"
        region = 1  # region = "punjab"
        branch = 1  # branch = "fortress"

        if region == 0 and city == 0 and branch == 0:
            devices = Devices.objects.all()

        elif region != 0 and city == 0 and branch == 0:
            devices = Devices.objects.filter(region=region)

        elif region != 0 and city != 0 and branch == 0:
            devices = Devices.objects.filter(region=region, city=city)

        else:
            devices = Devices.objects.filter(region=region, city=city, branch=branch)

        scores = Feedback.objects.filter(device__in=devices).values('score').annotate(count=Count('score')).\
            order_by('score')
        total_scores = Feedback.objects.count()
        data = {'total_count': total_scores, 'scores': list(scores)}
        return HttpResponse(json.dumps(data))