from django.contrib.auth import authenticate
from django.db.models import Count
from django.views.generic.base import TemplateView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Region, City, Branch
from app.serializers import RegionSerializer, CitySerializer, UserSerializer
from feedback.models import Question, FeedbackOption, Option, Feedback
from feedback.serializers import OverallFeedbackSerializer, OverallRattingSerializer, FeedbackAnalysisSerializer, \
    PositiveNegativeFeedbackSerializer, AllCommentsSerializer, AllBranchesSerializer, SegmentationSerializer, \
    ConcernsSerializer
from lively import constants
from lively.utils import generate_missing_options, get_filtered_feedback_options, generate_missing_sub_options, \
    generate_segmentation, generate_option_group, apply_general_filters, generate_option_groups
from dateutil import rrule
from datetime import datetime, timedelta
from django.core.paginator import Paginator


@api_view(['GET', 'POST'])
def login(request):
    if request.method == "POST":
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token = Token.objects.get_or_create(user=user)
            return Response({'status': True, 'message': 'User authenticated', 'token': token[0].key, 'user': UserSerializer(user).data})
        return Response({'status': False, 'message': 'User not authenticated'})


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
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
            filtered_feedback_options = FeedbackOption.objects.filter(option__in=question.options.values_list('id'))
            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id)

            filtered_feedback_options_count = filtered_feedback_options.count()
            feedback_options = filtered_feedback_options.values('option_id', 'option__text', 'option__parent_id').\
                annotate(count=Count('option_id'))
            list_feedback = generate_missing_options(question, feedback_options)

            data = {'feedback_count': filtered_feedback_options_count, 'feedbacks': list_feedback}
            feedback_response = OverallFeedbackSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def feedback_analysis(request):

    if request.method == 'GET':
        type = request.query_params.get('type', None)
        question_type = request.query_params.get('question_type', constants.MAIN_QUESTION)
        objects = None
        feedbacks = []

        try:
            question = Question.objects.get(type=question_type)
            feedback_options = FeedbackOption.objects.filter(option__in=question.options.values_list('id'))

            if type == constants.CITY_ANALYSIS:
                region_id = request.query_params.get('region', None)
                if region_id:
                    region = Region.objects.get(pk=region_id)
                    objects = region.cities.all()
            elif type == constants.BRANCH_ANALYSIS:
                city_id = request.query_params.get('city', None)
                if city_id:
                    city = City.objects.get(pk=city_id)
                    objects = city.branches.all()
            else:
                objects = Region.objects.all()

            for object in objects:
                filtered_feedback_options = get_filtered_feedback_options(feedback_options, type, object)
                filtered_feedback_options_count = filtered_feedback_options.count()
                filtered_feedback_options = filtered_feedback_options.values(
                    'option_id', 'option__text', 'option__parent_id').annotate(count=Count('option_id'))
                list_feedback = generate_missing_options(question, filtered_feedback_options)

                data = {'feedback_count': filtered_feedback_options_count, 'feedbacks': list_feedback}
                feedbacks.append({'object': object, 'data': data})

            feedback_data = {'count': objects.count(), 'analysis': feedbacks}
            feedback_response = FeedbackAnalysisSerializer(feedback_data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def feedback_analysis_breakdown(request):

    if request.method == 'GET':
        option_id = request.query_params.get('option', None)

        region_id = request.query_params.get('region', None)
        city_id = request.query_params.get('city', None)
        branch_id = request.query_params.get('branch', None)

        try:
            option = Option.objects.get(id=option_id)
            if option.is_parent():
                filtered_feedback_options = FeedbackOption.objects.filter(option__in=option.children.values_list('id'),
                feedback__in=FeedbackOption.objects.filter(option_id=option_id).values_list('feedback_id'))

                filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id)
                filtered_feedback_options_count = filtered_feedback_options .count()
                list_feedback = filtered_feedback_options.values('option_id', 'option__text', 'option__parent_id').\
                    annotate(count=Count('option_id'))

                data = {'feedback_count': filtered_feedback_options_count, 'feedbacks': list_feedback}
                feedback_response = OverallFeedbackSerializer(data)
                return Response(feedback_response.data)

            return Response(None)
        except Exception as e:
            return Response(None)


@api_view(['GET'])
def overall_rating(request):

    if request.method == 'GET':
        feedback_records_list = []

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)
            option_id = request.query_params.get('option', None)

            question = Question.objects.get(type=constants.SECONDARY_QUESTION)

            if option_id:
                filtered_feedback_options = FeedbackOption.objects.filter(
                    option__in=Option.objects.filter(parent=option_id).values_list('id'),
                    created_at__gte=datetime.now() - timedelta(days=constants.NO_OF_DAYS))
            else:
                filtered_feedback_options = FeedbackOption.objects.filter(
                    option__in=question.options.filter(parent=None).values_list('id'),
                    created_at__gte=datetime.now() - timedelta(days=constants.NO_OF_DAYS))

            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id)

            now = datetime.now()
            start_date = now - timedelta(days=constants.NO_OF_DAYS)
            for single_date in rrule.rrule(rrule.DAILY, dtstart=start_date, until=now):
                feedbacks = filtered_feedback_options.filter(created_at__day=single_date.day)
                filtered_feedbacks = feedbacks.values('option_id', 'option__text', 'option__parent_id').\
                    annotate(count=Count('option_id'))
                if option_id:
                    list_feedback = generate_missing_sub_options(option_id, filtered_feedbacks)
                else:
                    list_feedback = generate_missing_options(question, filtered_feedbacks)
                date_data = {'feedback_count': feedbacks.count(), 'feedbacks': list_feedback}
                single_date = datetime.strptime(str(single_date), constants.DATE_FORMAT)
                feedback_records_list.append({'date': single_date, 'data': date_data})

            feedback_response = OverallRattingSerializer(feedback_records_list, many=True)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def category_performance(request):

    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)

            option_id = request.query_params.get('option', None)
            question = Question.objects.get(type=constants.SECONDARY_QUESTION)

            if option_id:
                filtered_feedback_options = FeedbackOption.objects.filter(
                    option__in=Option.objects.filter(parent=option_id).values_list('id'))
            else:
                filtered_feedback_options = FeedbackOption.objects.filter(
                option__in=question.options.filter(parent=None).values_list('id'))

            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id)
            filtered_feedback_options_count = filtered_feedback_options.count()
            filtered_feedbacks = filtered_feedback_options.values('option_id', 'option__text', 'option__parent_id').\
                annotate(count=Count('option_id'))
            if option_id:
                list_feedback = generate_missing_sub_options(option_id, filtered_feedbacks)
            else:
                list_feedback = generate_missing_options(question, filtered_feedbacks)


            data = {'feedback_count': filtered_feedback_options_count, 'feedbacks': list_feedback}
            feedback_response = OverallFeedbackSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


#for admin panel
class DataView(TemplateView):
    template_name = "data_view.html"

    def get_context_data(self, **kwargs):
        context = super(DataView, self).get_context_data(**kwargs)

        page = self.request.GET.get('page', 1)

        all_feedbacks = Feedback.objects.all()
        feedbacks = []
        for feedback in all_feedbacks:
            feedbacks.append(feedback.to_dict())

        paginator = Paginator(feedbacks, constants.FEEDBACKS_PER_PAGE)
        context["feedbacks"] = paginator.page(page)
        context["count_feedback"] = all_feedbacks.count()
        context["num_pages"] = paginator.num_pages
        context["pages"] = range(1, paginator.num_pages + 1)
        return context


@api_view(['GET'])
def positive_negative_feedback(request):
    if request.method == 'GET':
        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)

            filtered_feedback_options = Feedback.objects.all()
            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id)

            negative_feedback = filtered_feedback_options.filter(
                feedback_option__option__score__in=constants.NEGATIVE_SCORE_LIST).\
                        exclude(comment__isnull=True).exclude(comment__exact='').order_by('-id')[:3]
            positive_feedback = filtered_feedback_options.filter(
                feedback_option__option__score__in=constants.POSITIVE_SCORE_LIST).\
                        exclude(comment__isnull=True).exclude(comment__exact='').order_by('-id')[:3]

            data = {'positive_feedbacks': positive_feedback, 'negative_feedbacks': negative_feedback}
            feedback_response = PositiveNegativeFeedbackSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def comments(request):
    if request.method == 'GET':
        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)
            page = request.query_params.get('page', 1)

            filtered_feedback = Feedback.objects.filter().exclude(comment__isnull=True).exclude(comment__exact='')
            filtered_feedback = apply_general_filters(filtered_feedback, region_id, city_id, branch_id)

            filtered_feedback_count = filtered_feedback.count()
            paginator = Paginator(filtered_feedback, constants.COMMENTS_PER_PAGE)

            feedback_comments = [feedback.feedback_comment_dict() for feedback in paginator.page(page)]

            data = {'feedback_count': filtered_feedback_count, 'feedbacks': feedback_comments}
            feedback_response = AllCommentsSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def map_view(request):
    if request.method == 'GET':
        try:
            branches = Branch.objects.all()

            branch_detail_list = []
            for branch in branches:
                branch_detail_list.append(
                    branch.branch_feedback_detail()
                )

            data = {'branch_count': branches.count(), 'branches': branch_detail_list}
            feedback_response = AllBranchesSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
def feedback_segmentation(request):
    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)
            option_id = request.query_params.get('option', None)

            date = request.query_params.get('date', None)
            if date and option_id:
                date = datetime.strptime(date, constants.DATE_FORMAT).date()
                option = Option.objects.get(id=option_id)
                options = option.children.all()
            else:
                return Response(None)

            filtered_feedback_options = FeedbackOption.objects.filter(
                option__in=Option.objects.filter(parent=option_id).values_list('id'),
                feedback__created_at__contains=date)

            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id)
            feedback_segmented_list = generate_option_groups(filtered_feedback_options, options)

            data = {'option_count': len(feedback_segmented_list), 'options': feedback_segmented_list}
            feedback_response = SegmentationSerializer(data)
            return Response(feedback_response.data)
        except Exception as e:
            return Response(None)


@api_view(['GET'])
def top_concerns(request):
    if request.method == 'GET':

        try:
            concerns = [
                    {"item": "Ketchap", "count": "110"},
                    {"item": "Bun", "count": "95"},
                    {"item": "Wings", "count": "56"},
                    {"item": "Fries", "count": "9"},
                    {"item": "Ketchap", "count": "110"},
                    {"item": "Bun", "count": "95"},
                    {"item": "Wings", "count": "56"},
                    {"item": "Fries", "count": "9"},
                ]

            data = {'concern_count': len(concerns), 'concern_list': concerns}
            feedback_response = ConcernsSerializer(data)
            return Response(feedback_response.data)
        except Exception as e:
            return Response(None)