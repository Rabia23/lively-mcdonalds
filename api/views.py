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
from lively.utils import valid_action_id, get_param

from feedback.serializers import OverallFeedbackSerializer, OverallRattingSerializer, FeedbackAnalysisSerializer, \
    PositiveNegativeFeedbackSerializer, AllCommentsSerializer, AllBranchesSerializer, SegmentationSerializer, \
    ConcernsSerializer, SegmentationRatingSerializer, FeedbackCommentSerializer, ActionAnalysisSerializer, \
    LoginSerializer

from lively.utils import generate_missing_options, generate_missing_sub_options, generate_option_groups, \
    generate_segmentation_with_options, generate_missing_actions


@api_view(['GET'])
def login(request):

    if request.method == "GET":
        username = get_param(request, 'username', None)
        password = get_param(request, 'password', None)
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
        region_id = get_param(request, 'region', None)
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
        city_id = get_param(request, 'city', None)
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
        now = datetime.now()

        try:
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)

            date_to = get_param(request, 'date_to', str(now.date()))
            date_from = get_param(request, 'date_from', str((now - timedelta(days=1)).date()))

            feedback_options = FeedbackOption.manager.question(constants.TYPE_1).\
                                            date(date_from, date_to).filters(region_id, city_id, branch_id)
            feedback_options_dict = feedback_options.values('option_id', 'option__text', 'option__parent_id', 'option__score').\
                annotate(count=Count('option_id'))
            list_feedback = generate_missing_options(Question.objects.get(type=constants.TYPE_1), feedback_options_dict)

            data = {'feedback_count': feedback_options.count(), 'feedbacks': sorted(list_feedback, reverse=True, key=itemgetter('option__score'))}
            feedback_response = OverallFeedbackSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def feedback_analysis(request, user):
    if request.method == 'GET':
        now = datetime.now()
        feedbacks = []
        objects = None

        try:
            type = get_param(request, 'type', None)
            question_type = get_param(request, 'question_type', constants.TYPE_1)

            date_to = get_param(request, 'date_to', str(now.date()))
            date_from = get_param(request, 'date_from', str((now - timedelta(days=1)).date()))

            feedback_options = FeedbackOption.manager.question(question_type).date(date_from, date_to)

            if type == constants.CITY_ANALYSIS:
                region_id = get_param(request, 'region', None)
                if region_id:
                    region = Region.objects.get(pk=region_id)
                    objects = region.cities.all()
            elif type == constants.BRANCH_ANALYSIS:
                city_id = get_param(request, 'city', None)
                if city_id:
                    city = City.objects.get(pk=city_id)
                    objects = city.branches.all()
            else:
                objects = Region.objects.all()

            for object in objects:
                related_feedback_options = feedback_options.related_filters(type, object)
                filtered_feedback_options = related_feedback_options.values(
                    'option_id', 'option__text', 'option__parent_id').annotate(count=Count('option_id'))
                list_feedback = generate_missing_options(Question.objects.get(type=question_type), filtered_feedback_options)

                data = {'feedback_count': related_feedback_options.count(), 'feedbacks': list_feedback}
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
        try:
            option_id = get_param(request, 'option', None)

            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)

            option = Option.objects.get(id=option_id)
            if option.is_parent():
                feedback_options = FeedbackOption.manager.children(option).feedback(option).\
                                        filters(region_id, city_id, branch_id)
                list_feedback = feedback_options.values('option_id', 'option__text', 'option__parent_id').\
                    annotate(count=Count('option_id'))

                data = {'feedback_count': feedback_options.count(), 'feedbacks': list_feedback}
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
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)

            option_id = get_param(request, 'option', None)
            option = Option.objects.get(id=option_id) if option_id else None

            question = Question.objects.get(type=constants.TYPE_2)

            #for grouping of data (daily, weekly, monthly, yearly)
            type = get_param(request, 'type', None)

            date_to = get_param(request, 'date_to', None)
            date_from = get_param(request, 'date_from', None)

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
                feedback_options = FeedbackOption.manager.date(str(single_date.date()), str(single_date.date())).\
                                        filters(region_id, city_id, branch_id)
                feedback_options = feedback_options.children(option) if option else feedback_options.\
                                        question_parent_options(question)
                filtered_feedback = feedback_options.values('option_id', 'option__text', 'option__parent_id').\
                                        annotate(count=Count('option_id'))
                list_feedback = generate_missing_sub_options(option_id, filtered_feedback) if option else \
                                    generate_missing_options(question, filtered_feedback)

                date_data = {'feedback_count': feedback_options.count(), 'feedbacks': list_feedback}
                feedback_records_list.append({'date': single_date.date(), 'data': date_data})


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
        now = datetime.now()

        try:
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)

            date_to = get_param(request, 'date_to', str(now.date()))
            date_from = get_param(request, 'date_from', str((now - timedelta(days=1)).date()))

            option_id = get_param(request, 'option', None)
            option = Option.objects.get(id=option_id) if option_id else None
            question = Question.objects.get(type=constants.TYPE_2)

            if option:
                feedback_options = FeedbackOption.manager.children(option).date(date_to, date_from).\
                                                filters(region_id, city_id, branch_id)
            else:
                feedback_options = FeedbackOption.manager.question_parent_options(question).\
                                                date(date_to, date_from).filters(region_id, city_id, branch_id)

            filtered_feedback_options = feedback_options.values('option_id', 'option__text', 'option__parent_id').\
                                            annotate(count=Count('option_id'))
            list_feedback = generate_missing_sub_options(option_id, filtered_feedback_options) if option else \
                                generate_missing_options(question, filtered_feedback_options)

            data = {'feedback_count': filtered_feedback_options.count(), 'feedbacks': list_feedback}
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
        feedback_list = []

        all_feedback = Feedback.objects.all().order_by('-created_at')

        for feedback in all_feedback:
            feedback_list.append(feedback.to_dict())

        paginator = Paginator(feedback_list, constants.FEEDBACKS_PER_PAGE)

        context["feedbacks"] = paginator.page(page)
        context["count_feedback"] = all_feedback.count()
        context["num_pages"] = paginator.num_pages
        context["pages"] = range(1, paginator.num_pages + 1)

        return context


@api_view(['GET'])
@my_login_required
def positive_negative_feedback(request, user):
    if request.method == 'GET':
        try:
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)

            feedback = Feedback.manager.filters(region_id, city_id, branch_id)

            negative_feedback = feedback.top_comments(constants.NEGATIVE_SCORE_LIST)
            positive_feedback = feedback.top_comments(constants.POSITIVE_SCORE_LIST)

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
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)
            page = int(get_param(request, 'page', 1))

            feedback = Feedback.manager.comments().filters(region_id, city_id, branch_id)
            paginator = Paginator(feedback, constants.COMMENTS_PER_PAGE)

            feedback_comments = [feedback.feedback_comment_dict() for feedback in paginator.page(page)]

            data = {'feedback_count': feedback.count(),
                    'feedbacks': feedback_comments,
                    'is_last_page': paginator.num_pages == int(page)}
            feedback_response = AllCommentsSerializer(data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)


@api_view(['GET'])
@my_login_required
def map_view(request, user):
    if request.method == 'GET':
        now = datetime.now()

        try:
            date_to = get_param(request, 'date_to', str(now.date()))
            date_from = get_param(request, 'date_from', str((now - timedelta(days=1)).date()))

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
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)
            type = get_param(request, 'type', None)

            option_id = get_param(request, 'option', None)
            option = Option.objects.get(id=option_id) if option_id else None

            date_to = get_param(request, 'date_to', None)
            date_to = datetime.strptime(date_to, constants.ONLY_DATE_FORMAT).date()

            if option:
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

            feedback_options = FeedbackOption.manager.children(option).date(date_from, date_to).filters(region_id, city_id, branch_id)
            feedback_segmented_list = generate_option_groups(feedback_options, options)

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
        now = datetime.now()

        try:
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)

            option_id = get_param(request, 'option', None)
            option = Option.objects.get(id=option_id) if option_id else None

            date_to = get_param(request, 'date_to', str(now.date()))
            date_from = get_param(request, 'date_from', str((now - timedelta(days=1)).date()))

            question = Question.objects.get(type=constants.TYPE_2)

            options = option.children.all() if option else question.options.all()
            feedback_options = FeedbackOption.manager.options(options).date(date_from, date_to).\
                                    filters(region_id, city_id, branch_id)
            feedback_segmented_list = generate_segmentation_with_options(feedback_options, options)

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
            feedback_id = get_param(request, 'feedback_id', None)
            action_id = get_param(request, 'action_id', None)

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
        now = datetime.now()
        data_list = []
        objects = None

        try:
            type = get_param(request, 'type', None)

            date_to = get_param(request, 'date_to', str(now.date()))
            date_from = get_param(request, 'date_from', str((now - timedelta(days=1)).date()))

            if type == constants.CITY_ANALYSIS:
                region_id = get_param(request, 'region', None)
                if region_id:
                    region = Region.objects.get(pk=region_id)
                    objects = region.cities.all()
            elif type == constants.BRANCH_ANALYSIS:
                city_id = get_param(request, 'city', None)
                if city_id:
                    city = City.objects.get(pk=city_id)
                    objects = city.branches.all()
            else:
                objects = Region.objects.all()

            for object in objects:
                feedback = Feedback.manager.related_filters(type, object).date(date_from, date_to).normal_feedback()
                filtered_feedback = feedback.values('action_taken').annotate(count=Count('action_taken'))
                filtered_feedback = generate_missing_actions(filtered_feedback)

                data = {'feedback_count': feedback.count(), 'action_analysis': filtered_feedback}
                data_list.append({'object': object, 'data': data})

            feedback_data = {'count': objects.count(), 'analysis': data_list}
            feedback_response = ActionAnalysisSerializer(feedback_data)
            return Response(feedback_response.data)

        except Exception as e:
            return Response(None)
