from django.contrib.auth import authenticate
from django.db.models import Count
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.area.models import Area
from apps.branch.models import Branch
from apps.city.models import City
from apps.option.models import Option
from apps.option.utils import generate_missing_options, generate_missing_sub_options, generate_option_groups, \
    generate_segmentation_with_options
from apps.question.models import Question
from apps.region.models import Region
from apps.review.models import FeedbackOption, Feedback
from apps.review.serializers import FeedbackSerializer
from apps.review.utils import generate_missing_actions, valid_action_id
from apps.serializers import ObjectSerializer, FeedbackCommentSerializer
from apps import constants
from dateutil import rrule
from dateutil.relativedelta import relativedelta
from datetime import datetime, timedelta
from django.core.paginator import Paginator
from django.utils import timezone
from operator import itemgetter
from apps.decorators import my_login_required
from apps.utils import get_param, get_data_param
from django.utils.decorators import method_decorator


class LoginView(APIView):

    def post(self, request, format=None):
        username = get_data_param(request, 'username', None)
        password = get_data_param(request, 'password', None)
        user = authenticate(username=username, password=password)
        if user:
            token = Token.objects.get_or_create(user=user)
            data = {'status': True, 'message': 'User authenticated', 'token': token[0].key, 'username': user.username}
        else:
            data = {'status': False, 'message': 'User not authenticated', 'token': None, 'username': None}

        return Response(data)


class OverallFeedbackView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
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
            return Response(data)

        except Exception as e:
            return Response(None)


class FeedbackAnalysisView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
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
            elif type == constants.REGIONAL_ANALYSIS:
                area_id = get_param(request, 'area', None)
                if area_id:
                    area = Area.objects.get(pk=area_id)
                    objects = area.regions.all()
                else:
                    objects = Region.objects.all()
            else:
                objects = Area.objects.all()

            for object in objects:
                related_feedback_options = feedback_options.related_filters(type, object)
                filtered_feedback_options = related_feedback_options.values(
                    'option_id', 'option__text', 'option__parent_id').annotate(count=Count('option_id'))
                list_feedback = generate_missing_options(Question.objects.get(type=question_type), filtered_feedback_options)

                data = {'feedback_count': related_feedback_options.count(), 'feedbacks': list_feedback}
                feedbacks.append({'object': ObjectSerializer(object).data, 'data': data})

            feedback_data = {'count': objects.count(), 'analysis': feedbacks}
            return Response(feedback_data)

        except Exception as e:
            return Response(None)


class FeedbackAnalysisBreakdownView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
        try:
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)
            area_id = get_param(request, 'area', None)

            option_id = get_param(request, 'option', None)
            option = Option.objects.get(id=option_id)
            if option.is_parent():
                feedback_options = FeedbackOption.manager.children(option).feedback(option).\
                                        filters(region_id, city_id, branch_id, area_id)
                list_feedback = feedback_options.values('option_id', 'option__text', 'option__parent_id').\
                    annotate(count=Count('option_id'))

                data = {'feedback_count': feedback_options.count(), 'feedbacks': list_feedback}
                return Response(data)

            return Response(None)
        except Exception as e:
            return Response(None)


class OverallRatingView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
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
                type = constants.DAILY_ANALYSIS
            else:
                date_to = str(now.date())
                if type == constants.YEARLY_ANALYSIS:
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
            date_to = current_tz.localize(datetime.strptime(date_to + " 23:59:59", constants.DATE_FORMAT))

            section_start_date = str(date_from.date())
            for single_date in rrule.rrule(rule, dtstart=date_from, until=date_to):
                if type != constants.DAILY_ANALYSIS:
                    section_end_date = str(single_date.date())
                    feedback_options = FeedbackOption.manager.date(section_start_date, section_end_date).\
                                        filters(region_id, city_id, branch_id)
                    section_start_date = section_end_date
                else:
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

            return Response(feedback_records_list)

        except Exception as e:
            return Response(None)


class CategoryPerformanceView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
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
                feedback_options = FeedbackOption.manager.children(option).date(date_from, date_to).\
                                                filters(region_id, city_id, branch_id)
            else:
                feedback_options = FeedbackOption.manager.question_parent_options(question).\
                                                date(date_from, date_to).filters(region_id, city_id, branch_id)

            filtered_feedback_options = feedback_options.values('option_id', 'option__text', 'option__parent_id').\
                                            annotate(count=Count('option_id'))
            list_feedback = generate_missing_sub_options(option_id, filtered_feedback_options) if option else \
                                generate_missing_options(question, filtered_feedback_options)

            data = {'feedback_count': feedback_options.count(), 'feedbacks': list_feedback}
            return Response(data)

        except Exception as e:
            return Response(None)


class PositiveNegativeFeedbackView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
        try:
            region_id = get_param(request, 'region', None)
            city_id = get_param(request, 'city', None)
            branch_id = get_param(request, 'branch', None)

            feedback = Feedback.manager.filters(region_id, city_id, branch_id)

            negative_feedback = feedback.top_comments(constants.NEGATIVE_SCORE_LIST)
            positive_feedback = feedback.top_comments(constants.POSITIVE_SCORE_LIST)

            data = {'positive_feedbacks': FeedbackSerializer(positive_feedback, many=True).data,
                    'negative_feedbacks': FeedbackSerializer(negative_feedback, many=True).data}
            return Response(data)

        except Exception as e:
            return Response(None)


class CommentsView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
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
            return Response(data)

        except Exception as e:
            return Response(None)


class MapView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
        now = datetime.now()

        try:
            date_to = get_param(request, 'date_to', str(now.date()))
            date_from = get_param(request, 'date_from', str((now - timedelta(days=1)).date()))

            branches = Branch.objects.all()
            branch_detail_list = [branch.branch_feedback_detail(date_from, date_to) for branch in branches]

            data = {'branch_count': branches.count(), 'branches': branch_detail_list}
            return Response(data)

        except Exception as e:
            return Response(None)


class FeedbackSegmentationView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
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

            feedback_options = FeedbackOption.manager.children(option).date(date_from, date_to).filters(region_id, city_id, branch_id)
            feedback_segmented_list = generate_option_groups(feedback_options, options)

            data = {'option_count': len(feedback_segmented_list), 'options': feedback_segmented_list}
            return Response(data)
        except Exception as e:
            return Response(None)


class TopConcernsView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
        try:
            concerns = [
                    {"name": "Ketchup", "weight": "57"},
                    {"name": "Bun", "weight": "20"},
                    {"name": "Wings", "weight": "41"},
                    {"name": "Fries", "weight": "18"},
                    {"name": "Chicken", "weight": "50"}
                ]

            data = {'concern_count': len(concerns), 'concern_list': concerns}
            return Response(data)
        except Exception as e:
            return Response(None)


class SegmentationRatingView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
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
            return Response(data)
        except Exception as e:
            return Response(None)


class ActionTakenView(APIView):

    @method_decorator(my_login_required)
    def post(self, request, format=None):
        try:
            feedback_id = get_data_param(request, 'feedback_id', None)
            action_id = get_data_param(request, 'action_id', None)

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


class ActionAnalysisView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
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
            elif type == constants.REGIONAL_ANALYSIS:
                area_id = get_param(request, 'area', None)
                if area_id:
                    area = Area.objects.get(pk=area_id)
                    objects = area.regions.all()
                else:
                    objects = Region.objects.all()
            else:
                objects = Area.objects.all()

            for object in objects:
                feedback = Feedback.manager.related_filters(type, object).date(date_from, date_to).normal_feedback()
                filtered_feedback = feedback.values('action_taken').annotate(count=Count('action_taken'))
                filtered_feedback = generate_missing_actions(filtered_feedback)

                data = {'feedback_count': feedback.count(), 'action_analysis': filtered_feedback}
                data_list.append({'object': ObjectSerializer(object).data, 'data': data})

            feedback_data = {'count': objects.count(), 'analysis': data_list}
            return Response(feedback_data)

        except Exception as e:
            return Response(None)


class TopChartsView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
        try:
            branch = Feedback.get_top_branch()
            city = Feedback.get_top_city()
            region = Feedback.get_top_region()
            
            data = {'branch': branch, 'city': city, 'region': region}
            return Response(data)
            
        except Exception as e:
            return Response(None)


#for live dashboard
class TopRankingsView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
        try:
            overall_experience = FeedbackOption.get_top_option()
            positive_negative_feedback = Feedback.get_feedback_type_count()
            qsc_count = FeedbackOption.get_qsc_count()

            data = {'overall_experience': overall_experience,
                    'top_concern': "Ketchup",
                    'positive_negative_feedback': positive_negative_feedback,
                    'qsc_count': qsc_count}

            return Response(data)

        except Exception as e:
            return Response(None)


#for live dashboard
class ComplaintAnalysisView(APIView):

    @method_decorator(my_login_required)
    def get(self, request, format=None):
        try:
            data_list = []
            objects = Area.objects.all()

            feedback = Feedback.manager.normal_feedback()
            filtered_feedback = feedback.values('action_taken').annotate(count=Count('action_taken'))
            filtered_feedback = generate_missing_actions(filtered_feedback)

            data = {'feedback_count': feedback.count(), 'action_analysis': filtered_feedback}
            data_list.append({'object': {"id": "", "name": "Pakistan", "objectId": ""}, 'data': data})

            for object in objects:
                feedback = Feedback.manager.related_filters(0, object).normal_feedback()
                filtered_feedback = feedback.values('action_taken').annotate(count=Count('action_taken'))
                filtered_feedback = generate_missing_actions(filtered_feedback)

                data = {'feedback_count': feedback.count(), 'action_analysis': filtered_feedback}
                data_list.append({'object': ObjectSerializer(object).data, 'data': data})

            return Response(data_list)

        except Exception as e:
            return Response(None)


