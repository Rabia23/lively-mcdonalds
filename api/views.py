from django.db.models.aggregates import Count
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Region, City, Branch
from app.serializers import RegionSerializer, CitySerializer
from feedback.models import Feedback, Question, FeedbackOption
from feedback.serializers import OverallFeedbackSerializer
from lively import constants


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


@api_view(['GET'])
def overall_feedback(request):

    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)

            question = Question.objects.get(type=constants.MAIN_QUESTION)

            if region_id and city_id and branch_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.values_list('id'),
                    feedback__branch__exact=branch_id, feedback__branch__city__exact=city_id, feedback__branch__city__region__exact=region_id).\
                    values('option_id', 'option__text').annotate(count=Count('option_id', 'option__text'))
            elif region_id and city_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.values_list('id'),
                    feedback__branch__city__exact=city_id, feedback__branch__city__region__exact=region_id).\
                    values('option_id', 'option__text').annotate(count=Count('option_id', 'option__text'))
            elif region_id:
                feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.values_list('id'),
                    feedback__branch__city__region__exact=region_id).\
                    values('option_id', 'option__text').annotate(count=Count('option_id', 'option__text'))
            else:
                feedback_options = FeedbackOption.objects.filter(option__in=question.options.values_list('id')).\
                    values('option_id', 'option__text').annotate(count=Count('option_id', 'option__text'))

            list_feedback_option_ids = [item['option_id'] for item in feedback_options]
            list_feedback = list(feedback_options)

            for option in question.options.all():
                if option.id not in list_feedback_option_ids:
                    list_feedback.append({'count': 0, 'option_id': option.id, 'option__text': option.text})

            data = {'feedback_count': feedback_options.count(), 'feedbacks': list_feedback}
            feedback_response = OverallFeedbackSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)




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
