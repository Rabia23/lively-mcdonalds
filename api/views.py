from django.contrib.auth import authenticate
from django.db.models import Count
from django.views.generic.base import TemplateView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Region, City, Branch
from app.serializers import RegionSerializer, CitySerializer
from feedback.models import Question, FeedbackOption, Option, Feedback
from lively import constants
from dateutil import rrule
from dateutil.relativedelta import relativedelta
from datetime import datetime, timedelta
from django.core.paginator import Paginator
from django.utils import timezone
from operator import itemgetter
from lively.decorators import my_login_required
from lively.utils import valid_action_id

from feedback.serializers import OverallFeedbackSerializer, OverallRattingSerializer, FeedbackAnalysisSerializer, \
    PositiveNegativeFeedbackSerializer, AllCommentsSerializer, AllBranchesSerializer, SegmentationSerializer, \
    ConcernsSerializer, SegmentationRatingSerializer, FeedbackCommentSerializer, ActionAnalysisSerializer, \
    LoginSerializer

from lively.utils import generate_missing_options, get_filtered_feedback_options, generate_missing_sub_options, \
    apply_general_filters, generate_option_groups, generate_segmentation_with_options, apply_date_range_filter, \
    get_filtered_feedback, generate_missing_actions


@api_view(['GET'])
def login(request):

    if request.method == "GET":
        username = request.query_params.get('username')
        password = request.query_params.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token = Token.objects.get_or_create(user=user)
            data = {'status': True, 'message': 'User authenticated', 'token': token[0].key, 'user': user}
        else:
            data = {'status': False, 'message': 'User not authenticated', 'token': None, 'user': None}

        serializer = LoginSerializer(data)
        return Response(serializer.data)


@api_view(['GET'])
@my_login_required
def region(request, user):

    """
    Get all the regions
    """

    if request.method == 'GET':
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@my_login_required
def city(request, user):

    """
    Get all cities of specific region

    region -- search by region
    """

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


@api_view(['GET'])
@my_login_required
def branch(request, user):

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
@my_login_required
def overall_feedback(request, user):
    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)

            date_to = request.query_params.get('date_to', None)
            date_from = request.query_params.get('date_from', None)

            question = Question.objects.get(type=constants.MAIN_QUESTION)
            filtered_feedback_options = FeedbackOption.objects.filter(option__in=question.options.values_list('id'))
            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id,
                                            date_to, date_from)

            filtered_feedback_options_count = filtered_feedback_options.count()
            feedback_options = filtered_feedback_options.values('option_id', 'option__text', 'option__parent_id', 'option__score').\
                annotate(count=Count('option_id'))
            list_feedback = generate_missing_options(question, feedback_options)

            data = {'feedback_count': filtered_feedback_options_count, 'feedbacks': sorted(list_feedback, reverse=True, key=itemgetter('option__score'))}
            feedback_response = OverallFeedbackSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def feedback_analysis(request, user):
    if request.method == 'GET':
        feedbacks = []

        try:
            type = request.query_params.get('type', None)
            question_type = request.query_params.get('question_type', constants.MAIN_QUESTION)
            objects = None

            date_to = request.query_params.get('date_to', None)
            date_from = request.query_params.get('date_from', None)

            question = Question.objects.get(type=question_type)
            feedback_options = FeedbackOption.objects.filter(option__in=question.options.values_list('id'))
            feedback_options = apply_date_range_filter(feedback_options, date_to, date_from)

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
@my_login_required
def feedback_analysis_breakdown(request, user):

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
@my_login_required
def overall_rating(request, user):
    if request.method == 'GET':
        feedback_records_list = []

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)

            option_id = request.query_params.get('option', None)
            option_id = None if not option_id else option_id

            question = Question.objects.get(type=constants.SECONDARY_QUESTION)

            #for grouping of data (daily, weekly, monthly, yearly)
            type = request.query_params.get('type', None)

            date_to = request.query_params.get('date_to', None)
            date_from = request.query_params.get('date_from', None)

            current_tz = timezone.get_current_timezone()
            now = datetime.now()

            if date_to and date_from:
                rule = rrule.DAILY #when evenr there is a date range
            elif type == constants.YEARLY_ANALYSIS:
                rule = rrule.YEARLY
                date_from = str((now - relativedelta(years=constants.NO_OF_YEARS)).date())
            elif type == constants.MONTHLY_ANALYSIS:
                rule = rrule.MONTHLY
                date_from = str((now - relativedelta(months=constants.NO_OF_MONTHS)).date())
            elif type == constants.WEEK_ANALYSIS:
                rule = rrule.WEEKLY
                date_from = str((now - relativedelta(weeks=constants.NO_OF_WEEKS)).date())
            else:
                rule = rrule.DAILY
                date_from = str((now - timedelta(days=constants.NO_OF_DAYS)).date())

            date_from = current_tz.localize(datetime.strptime(date_from + " 00:00:00", constants.DATE_FORMAT))
            date_to = current_tz.localize(datetime.strptime(str(now.date()) + " 23:59:59", constants.DATE_FORMAT))

            for single_date in rrule.rrule(rule, dtstart=date_from, until=date_to):
                section_start_date = current_tz.localize(datetime.strptime(str(single_date.date()) + " 00:00:00", constants.DATE_FORMAT))
                section_end_date = current_tz.localize(datetime.strptime(str(single_date.date()) + " 23:59:59", constants.DATE_FORMAT))
                feedback_data = FeedbackOption.objects.filter(created_at__gt=section_start_date, created_at__lte=section_end_date)
                filtered_feedback_options = apply_general_filters(feedback_data, region_id, city_id, branch_id)

                if option_id:
                    filtered_feedback_options = filtered_feedback_options.filter(option__in=Option.objects.filter(parent=option_id).values_list('id'))
                else:
                    filtered_feedback_options = filtered_feedback_options.filter(option__in=question.options.filter(parent=option_id).values_list('id'))

                filtered_feedback = filtered_feedback_options.values('option_id', 'option__text', 'option__parent_id').annotate(count=Count('option_id'))

                if option_id:
                    list_feedback = generate_missing_sub_options(option_id, filtered_feedback)
                else:
                    list_feedback = generate_missing_options(question, filtered_feedback)

                date_data = {'feedback_count': filtered_feedback_options.count(), 'feedbacks': list_feedback}

                if type == constants.YEARLY_ANALYSIS or type == constants.MONTHLY_ANALYSIS or type == constants.WEEK_ANALYSIS:
                    display_date = current_tz.localize(datetime.strptime(str(section_end_date.date()), constants.ONLY_DATE_FORMAT))
                else:
                    display_date = current_tz.localize(datetime.strptime(str(section_start_date.date()), constants.ONLY_DATE_FORMAT))

                feedback_records_list.append({'date': display_date.date(), 'data': date_data})


            if len(feedback_records_list) > constants.NO_OF_DAYS:
                feedback_records_list = feedback_records_list[-constants.NO_OF_DAYS:]

            feedback_response = OverallRattingSerializer(feedback_records_list, many=True)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def category_performance(request, user):

    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)

            date_to = request.query_params.get('date_to', None)
            date_from = request.query_params.get('date_from', None)

            option_id = request.query_params.get('option', None)
            question = Question.objects.get(type=constants.SECONDARY_QUESTION)

            if option_id:
                filtered_feedback_options = FeedbackOption.objects.filter(
                    option__in=Option.objects.filter(parent=option_id).values_list('id'))
            else:
                filtered_feedback_options = FeedbackOption.objects.filter(
                option__in=question.options.filter(parent=None).values_list('id'))

            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id,
                                                              date_to, date_from)

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

        all_feedbacks = Feedback.objects.all().order_by('-created_at')
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
@my_login_required
def positive_negative_feedback(request, user):
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
@my_login_required
def comments(request, user):
    if request.method == 'GET':
        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)
            page = request.query_params.get('page', 1)

            filtered_feedback = Feedback.objects.filter().exclude(comment__isnull=True).exclude(comment__exact='').order_by('-id')
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
@my_login_required
def map_view(request, user):
    if request.method == 'GET':
        try:
            date_to = request.query_params.get('date_to', None)
            date_from = request.query_params.get('date_from', None)

            branches = Branch.objects.all()

            branch_detail_list = []
            for branch in branches:
                branch_detail_list.append(
                    branch.branch_feedback_detail(date_from, date_to)
                )

            data = {'branch_count': branches.count(), 'branches': branch_detail_list}
            feedback_response = AllBranchesSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def feedback_segmentation(request, user):
    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)
            option_id = request.query_params.get('option', None)
            type = request.query_params.get('type', None)

            date_to = request.query_params.get('date_to', None)
            date_to = datetime.strptime(date_to, constants.ONLY_DATE_FORMAT).date()

            if option_id:
                option = Option.objects.get(id=option_id)
                options = option.children.all()
            else:
                return Response(None)

            if type == constants.YEARLY_ANALYSIS:
                date_from = str((date_to - relativedelta(months=constants.NO_OF_MONTHS)))
            elif type == constants.MONTHLY_ANALYSIS:
                date_from = str((date_to - relativedelta(weeks=constants.NO_OF_WEEKS)))
            elif type == constants.WEEK_ANALYSIS:
                date_from = str((date_to - timedelta(days=constants.NO_OF_DAYS)))
            else:
                date_from = str(date_to)

            date_to = str(date_to)
            current_tz = timezone.get_current_timezone()
            date_from = current_tz.localize(datetime.strptime(date_from + " 00:00:00", constants.DATE_FORMAT))
            date_to = current_tz.localize(datetime.strptime(date_to + " 23:59:59", constants.DATE_FORMAT))

            filtered_feedback_options = FeedbackOption.objects.filter(
                option__in=Option.objects.filter(parent=option_id).values_list('id'),
                feedback__created_at__gt=date_from, created_at__lte=date_to)

            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id)
            feedback_segmented_list = generate_option_groups(filtered_feedback_options, options)

            data = {'option_count': len(feedback_segmented_list), 'options': feedback_segmented_list}
            feedback_response = SegmentationSerializer(data)
            return Response(feedback_response.data)
        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def top_concerns(request, user):
    if request.method == 'GET':

        try:
            concerns = [
                    {"name": "Ketchup", "weight": "57"},
                    {"name": "Bun", "weight": "20"},
                    {"name": "Wings", "weight": "41"},
                    {"name": "Fries", "weight": "18"},
                    {"name": "Chicken", "weight": "50"}
                ]

            data = {'concern_count': len(concerns), 'concern_list': concerns}
            feedback_response = ConcernsSerializer(data)
            return Response(feedback_response.data)
        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def segmentation_rating(request, user):
    if request.method == 'GET':

        try:
            region_id = request.query_params.get('region', None)
            city_id = request.query_params.get('city', None)
            branch_id = request.query_params.get('branch', None)
            option_id = request.query_params.get('option', None)

            date_to = request.query_params.get('date_to', None)
            date_from = request.query_params.get('date_from', None)

            question = Question.objects.get(type=constants.SECONDARY_QUESTION)

            if option_id:
                option = Option.objects.get(id=option_id)
                options = option.children.all()

                filtered_feedback_options = FeedbackOption.objects.filter(
                    option__in=Option.objects.filter(parent=option_id).values_list('id'))
            else:
                options = question.options.all()
                filtered_feedback_options = FeedbackOption.objects.filter(
                    option__in=options.values_list('id'))

            filtered_feedback_options = apply_general_filters(filtered_feedback_options, region_id, city_id, branch_id,
                                                              date_to, date_from)
            feedback_segmented_list = generate_segmentation_with_options(filtered_feedback_options, options)

            data = {'segment_count': len(feedback_segmented_list), 'segments': feedback_segmented_list}
            feedback_response = SegmentationRatingSerializer(data)
            return Response(feedback_response.data)
        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def action_taken(request, user):
    if request.method == 'GET':

        try:
            feedback_id = request.query_params.get('feedback_id', None)
            action_id = request.query_params.get('action_id', None)

            action_id = int(action_id) if action_id else None
            if feedback_id and action_id and valid_action_id(action_id):
                feedback = Feedback.objects.get(pk=feedback_id)

                feedback.action_taken = action_id
                feedback.save()

                feedback_response = FeedbackCommentSerializer(feedback.feedback_comment_dict())
                return Response(feedback_response.data)
            else:
                return Response(None)
        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def action_analysis(request, user):

    if request.method == 'GET':
        data_list = []

        try:
            type = request.query_params.get('type', None)
            objects = None

            date_to = request.query_params.get('date_to', None)
            date_from = request.query_params.get('date_from', None)

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
                filtered_feedback = get_filtered_feedback(type, object)
                filtered_feedback = apply_date_range_filter(filtered_feedback, date_to, date_from)
                filtered_feedback_count = filtered_feedback.count()
                filtered_feedback = filtered_feedback.values('action_taken').annotate(count=Count('action_taken'))
                filtered_feedback = generate_missing_actions(filtered_feedback)

                data = {'feedback_count': filtered_feedback_count, 'action_analysis': filtered_feedback}
                data_list.append({'object': object, 'data': data})

            feedback_data = {'count': objects.count(), 'analysis': data_list}
            feedback_response = ActionAnalysisSerializer(feedback_data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)
