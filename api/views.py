from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Region, City, Branch
from app.serializers import RegionSerializer, CitySerializer


@api_view(['GET', 'POST'])
def region(request):

    if request.method == 'GET':
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def city(request):

    if request.method == 'GET':
        cities = None
        region_id = request.query_params.get('region', None)
        if region_id:
            region = Region.get_by_id(region_id)
            if region:
                cities = region.cities.all()
        else:
            cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def branch(request):

    if request.method == 'GET':
        branches = None
        city_id = request.query_params.get('city', None)
        if city_id:
            city = City.get_by_id(city_id)
            if city:
                branches = city.branches.all()
        else:
            branches = Branch.objects.all()
        serializer = CitySerializer(branches, many=True)
        return Response(serializer.data)


# @api_view(['GET'])
# def feedback_with_scores(request):
#
#     if request.method == 'GET':
#         region_id = request.query_params.get('region', None)
#         city_id = request.query_params.get('city', None)
#         branch_id = request.query_params.get('branch', None)
#
#         if region_id and city_id and branch_id:
#             scores = Feedback.objects.filter(branch__exact=branch_id, branch__city__exact=city_id, branch__city__region__exact=region_id).\
#                 values('score').\
#                 annotate(count=Count('score'))
#         elif region_id and city_id:
#             scores = Feedback.objects.filter(branch__city__exact=city_id, branch__city__region__exact=region_id).\
#                 values('score').\
#                 annotate(count=Count('score'))
#         elif region_id:
#             scores = Feedback.objects.filter(branch__city__region__exact=region_id).\
#                 values('score').\
#                 annotate(count=Count('score'))
#         else:
#             scores = Feedback.objects.values('score').annotate(count=Count('score'))
#
#         list_score_values = [item['score'] for item in scores]
#         list_score_feedback = [item for item in scores]
#
#         for type in ScoreTypes:
#             if type.value not in list_score_values:
#                 list_score_feedback.append({'count': 0, 'score': type.value})
#
#         data = {'scores_count': scores.count(), 'scores': list_score_feedback}
#         feedback_response = CustomFeedbackSerializer(data)
#         return Response(feedback_response.data)
#
#
#
# @api_view(['GET'])
# def followup_options_feedback(request):
#
#     if request.method == 'GET':
#
#         region_id = request.query_params.get('region', None)
#         city_id = request.query_params.get('city', None)
#         branch_id = request.query_params.get('branch', None)
#
#         if region_id and city_id and branch_id:
#             data = SelectedFollowupOption.objects.filter(feedback__branch__exact=branch_id, feedback__branch__city__exact=city_id, feedback__branch__city__region__exact=region_id, followup_option__parent__isnull=True).\
#                 values('followup_option', 'followup_option__text').\
#                 annotate(count=Count('followup_option'))
#         elif region_id and city_id:
#             data = SelectedFollowupOption.objects.filter(feedback__branch__city__exact=city_id, feedback__branch__city__region__exact=region_id, followup_option__parent__isnull=True).\
#                 values('followup_option', 'followup_option__text').\
#                 annotate(count=Count('followup_option'))
#         elif region_id:
#             data = SelectedFollowupOption.objects.filter(feedback__branch__city__region__exact=region_id, followup_option__parent__isnull=True).\
#                 values('followup_option', 'followup_option__text').\
#                 annotate(count=Count('followup_option'))
#         else:
#             data = SelectedFollowupOption.objects.filter(followup_option__parent__isnull=True).\
#                 values('followup_option', 'followup_option__text').\
#                 annotate(count=Count('followup_option'))
#
#         followup_option_response = CustomFollowupOptionSerializer(data, many=True)
#         return Response(followup_option_response.data)
#
