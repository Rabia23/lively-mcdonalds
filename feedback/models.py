from django.contrib.auth.models import User
from django.db import models
from app.models import Branch, UserInfo
from lively import constants, settings
from datetime import datetime
from dateutil import tz
from django.utils import timezone


class FeedbackQuerySet(models.QuerySet):

    def date(self, date_from, date_to):
        if date_to and date_from:
            current_tz = timezone.get_current_timezone()
            date_to = current_tz.localize(datetime.strptime(date_to + " 23:59:59", constants.DATE_FORMAT))
            date_from = current_tz.localize(datetime.strptime(date_from + " 00:00:00", constants.DATE_FORMAT))
            return self.filter(created_at__gte=date_from, created_at__lte=date_to)
        return self

    def filters(self, region_id, city_id, branch_id):
        if region_id and city_id and branch_id:
            return self.filter(
                branch__exact=branch_id,
                branch__city__exact=city_id,
                branch__city__region__exact=region_id)
        elif region_id and city_id:
            return self.filter(
                branch__city__exact=city_id,
                branch__city__region__exact=region_id)
        elif region_id:
            return self.filter(
                branch__city__region__exact=region_id)
        return self

    def related_filters(self, type, object):
        if type == constants.CITY_ANALYSIS:
            return self.filter(branch__city__exact=object.id)
        elif type == constants.BRANCH_ANALYSIS:
            return self.filter(branch__exact=object.id)
        else:
            return self.filter(branch__city__region__exact=object.id)

    def top_comments(self, comment_type):
        return self.filter(feedback_option__option__score__in=comment_type).\
                        exclude(comment__isnull=True).exclude(comment__exact='').order_by('-id')[:3]

    def comments(self):
        return self.filter(comment__isnull=False).exclude(comment__exact='').order_by('-id')


class FeedbackManager(models.Manager):
    def get_query_set(self):
        return FeedbackQuerySet(Feedback)

    def __getattr__(self, attr, *args):
        try:
            return getattr(self.__class__, attr, *args)
        except AttributeError:
            return getattr(self.get_query_set(), attr, *args)


class Feedback(models.Model):
    user = models.ForeignKey(User, related_name='feedback', null=True, blank=True)
    branch = models.ForeignKey(Branch, related_name='feedback', null=True, blank=True)
    comment = models.CharField(max_length=1000)
    objectId = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    action_taken = models.IntegerField(default=constants.UNPROCESSED)
    gro_name = models.CharField(max_length=25, null=True, blank=True)

    objects = models.Manager()
    manager = FeedbackManager()


    def __str__(self):
       return self.objectId

    @staticmethod
    def get_if_exists(objectId):
        feedback = Feedback.objects.filter(objectId=objectId).first()
        if feedback:
            return feedback

    def is_negative(self):
        options = self.feedback_option.filter(option__score__in=constants.NEGATIVE_SCORE_LIST)
        if options:
            return True
        return False

    def is_bad(self):
        options = self.feedback_option.filter(option__score=constants.BAD_SCORE)
        if options:
            return True
        return False

    def problems(self):
        problems = self.feedback_option.all().exclude(option__parent=None).values("option__text")
        return ", ".join(problem["option__text"] for problem in problems)

    def customer_name(self):
        if self.user:
            if self.user.first_name:
                return self.user.first_name
        return constants.ANONYMOUS_TEXT

    def customer_phone(self):
        user_info = UserInfo.objects.filter(user=self.user).first()
        if user_info:
            if user_info.phone_no:
                return user_info.phone_no
        return constants.NOT_ATTEMPTED_TEXT

    def selected_main_option(self):
        main_question = Question.objects.get(type=constants.TYPE_1)
        option_list = self.feedback_option.filter(option__in=main_question.options.filter().values_list('id')).values_list('option_id')
        option = Option.objects.filter(pk__in=option_list).first()
        if option:
            return option

    def selected_secondary_option(self):
        secondary_question = Question.objects.get(type=constants.TYPE_2)
        option_list = self.feedback_option.filter(option__in=secondary_question.options.filter().values_list('id')).values_list('option_id')
        options = Option.objects.filter(pk__in=option_list)
        if options:
            return options

    def get_segment(self):
        start_time = get_time(constants.STARTING_TIME)
        breakfast_time = get_time(constants.BREAKFAST_TIME)
        lunch_time = get_time(constants.LUNCH_TIME)
        snack_time = get_time(constants.SNACK_TIME)
        dinner_time = get_time(constants.DINNER_TIME)
        late_night_time = get_time(constants.LATE_NIGHT_TIME)

        created_at = get_converted_time(self.created_at)

        if created_at >= start_time and created_at < breakfast_time:
            return constants.segments[constants.BREAKFAST_TIME]
        elif created_at >= breakfast_time and created_at < lunch_time:
            return constants.segments[constants.LUNCH_TIME]
        elif created_at >= lunch_time and created_at < snack_time:
            return constants.segments[constants.SNACK_TIME]
        elif created_at >= snack_time and created_at < dinner_time:
            return constants.segments[constants.DINNER_TIME]
        elif created_at >= dinner_time and created_at < late_night_time:
            return constants.segments[constants.LATE_NIGHT_TIME]
        return ""

    def get_shift(self):
        start_time = get_time(constants.STARTING_TIME)
        breakfast_shift = get_time(constants.BREAKFAST_SHIFT_TIME)
        open_shift = get_time(constants.OPEN_SHIFT_TIME)
        close_shift = get_time(constants.CLOSE_SHIFT_TIME)
        over_night_shift = get_time(constants.OVERNIGHT_SHIFT_TIME)

        created_at = get_converted_time(self.created_at)

        if created_at >= start_time and created_at < breakfast_shift:
            return constants.shifts[constants.BREAKFAST_TIME]
        elif created_at >= breakfast_shift and created_at < open_shift:
            return constants.shifts[constants.OPEN_SHIFT_TIME]
        elif created_at >= open_shift and created_at < close_shift:
            return constants.shifts[constants.CLOSE_SHIFT_TIME]
        elif created_at >= close_shift and created_at < over_night_shift:
            return constants.shifts[constants.OVERNIGHT_SHIFT_TIME]
        return ""

    def to_dict(self):
        try:
            feedback = {
                "objectId": self.objectId,
                "comment": self.comment,
                "branch": self.branch.name,
                "city": self.branch.city.name,
                "region": self.branch.city.region.name,
                "main_question_options": self.selected_main_option(),
                "secondary_question_options": self.selected_secondary_option(),
            }
            return feedback
        except Exception as e:
            return {}

    def feedback_comment_dict(self):
        user_info = UserInfo.objects.filter(user=self.user).first()
        try:
            feedback = {
                "id": self.id,
                "objectId": self.objectId,
                "comment": self.comment,
                "branch": self.branch.name,
                "city": self.branch.city.name,
                "region": self.branch.city.region.name,
                "user_name": user_info.get_username() if user_info else None,
                "user_phone": user_info.get_phone() if user_info else None,
                "segment": self.get_segment(),
                "shift": self.get_shift(),
                "is_negative": self.is_negative(),
                "action_taken": self.action_taken,
                "email": self.user.email,
            }
            return feedback
        except Exception as e:
            return {}


class Promotion(models.Model):
    title = models.TextField()
    isActive = models.BooleanField(default=True)
    objectId = models.CharField(max_length=20)

    def __str__(self):
       return self.title

    @staticmethod
    def get_if_exists(objectId):
        promotion = Promotion.objects.filter(objectId=objectId).first()
        if promotion:
            return promotion


class Question(models.Model):
    text = models.TextField()
    isActive = models.BooleanField(default=True)
    type = models.IntegerField()
    objectId = models.CharField(max_length=20)
    isPromotion = models.BooleanField(default=True)
    promotion = models.ForeignKey(Promotion, related_name='promotion', null=True, blank=True)

    def __str__(self):
       return self.text

    @staticmethod
    def get_if_exists(objectId):
        question = Question.objects.filter(objectId=objectId).first()
        if question:
            return question


class Option(models.Model):
    text = models.TextField()
    objectId = models.CharField(max_length=20)
    score = models.IntegerField(default=0)
    question = models.ForeignKey(Question, related_name='options', null=True, blank=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children')
    code = models.CharField(max_length=20)

    def __str__(self):
       return self.text

    @staticmethod
    def get_if_exists(objectId):
        option = Option.objects.filter(objectId=objectId).first()
        if option:
            return option

    def is_parent(self):
        return self.children.count() > 0


class FeedbackOptionQuerySet(models.QuerySet):
    def question(self, question_type):
        question = Question.objects.get(type=question_type)
        return self.filter(option__in=question.options.values_list('id'))

    def date(self, date_from, date_to):
        if date_to and date_from:
            current_tz = timezone.get_current_timezone()
            date_to = current_tz.localize(datetime.strptime(date_to + " 23:59:59", constants.DATE_FORMAT))
            date_from = current_tz.localize(datetime.strptime(date_from + " 00:00:00", constants.DATE_FORMAT))
            return self.filter(created_at__gte=date_from, created_at__lte=date_to)
        return self

    def filters(self, region_id, city_id, branch_id):
        if region_id and city_id and branch_id:
            return self.filter(
                feedback__branch__exact=branch_id,
                feedback__branch__city__exact=city_id,
                feedback__branch__city__region__exact=region_id)
        elif region_id and city_id:
            return self.filter(
                feedback__branch__city__exact=city_id,
                feedback__branch__city__region__exact=region_id)
        elif region_id:
            return self.filter(
                feedback__branch__city__region__exact=region_id)
        return self

    def related_filters(self, type, object):
        if type == constants.CITY_ANALYSIS:
            return self.filter(feedback__branch__city__exact=object.id)
        elif type == constants.BRANCH_ANALYSIS:
            return self.filter(feedback__branch__exact=object.id)
        else:
            return self.filter(feedback__branch__city__region__exact=object.id)


    def feedback(self, option):
        return self.filter(feedback__in=FeedbackOption.objects.filter(option=option).values_list('feedback_id'))

    def children(self, option):
        return self.filter(option__in=option.children.values_list('id'))

    def question_children(self, question, option):
        return self.filter(option__in=question.options.filter(parent=option.id).values_list('id'))

    def question_parent_options(self, question):
        return self.filter(option__in=question.options.filter(parent=None).values_list('id'))

    def options(self, options):
        return self.filter(option__in=options.values_list('id'))


class FeedbackOptionManager(models.Manager):
    def get_query_set(self):
        return FeedbackOptionQuerySet(FeedbackOption)

    def __getattr__(self, attr, *args):
        try:
            return getattr(self.__class__, attr, *args)
        except AttributeError:
            return getattr(self.get_query_set(), attr, *args)


class FeedbackOption(models.Model):
    feedback = models.ForeignKey(Feedback, related_name='feedback_option', null=True, blank=True)
    option = models.ForeignKey(Option, related_name='feedback_option', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()
    manager = FeedbackOptionManager()

    def to_option_dict(self):
        try:
            feedback_option = {
                "option_id": self.option_id,
                "option__text": self.option.text,
            }
            return feedback_option
        except Exception as e:
            return {}

    def is_negative_option(self):
        if self.option.score in constants.NEGATIVE_SCORE_LIST:
            return True
        return False

    @staticmethod
    def get_if_exists(objectId):
        feedback_option = FeedbackOption.objects.filter(objectId=objectId).first()
        if feedback_option:
            return feedback_option

    @staticmethod
    def get_if_exists(feedback_id, option_id):
        feedback_option = FeedbackOption.objects.filter(feedback_id=feedback_id, option_id=option_id).first()
        if feedback_option:
            return feedback_option


def get_time(constant):
    return datetime.strptime(constant, '%H:%M').time()


def get_converted_time(time):
    time = time.strftime(constants.DATE_FORMAT)

    from_zone = tz.gettz('UTC')
    to_zone = tz.gettz('Asia/Karachi')
    utc = datetime.strptime(str(time), constants.DATE_FORMAT)
    utc = utc.replace(tzinfo=from_zone)
    converted_time = utc.astimezone(to_zone)
    return converted_time.time()
