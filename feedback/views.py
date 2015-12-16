from rest_framework.decorators import api_view
from rest_framework.response import Response
from feedback.models import Feedback, Option, Question, FeedbackOption, Promotion
from feedback.serializers import FeedbackSerializer, \
    OptionSerializer, QuestionSerializer, FeedbackOptionSerializer, PromotionSerializer
from lively import constants
from lively.parse_utils import branch_get, user_get, feedback_get, option_get
from lively.utils import save_and_response, save, response, get_related_branch, get_related_user, get_related_feedback, \
    get_related_option, send_negative_feedback_email
from django.template import Context
from django.db import transaction

@api_view(['GET', 'POST'])
@transaction.atomic
def feedback(request):

    if request.method == 'GET':
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            feedback = Feedback.get_if_exists(data["objectId"])
            if feedback:
                serializer = FeedbackSerializer(feedback, data=data)
                parse_response = save_and_response(serializer, data)
            else:
                serializer = FeedbackSerializer(data=data)
                feedback = save(serializer)

                parse_response = response(data)

            related_branch = branch_get(data["branch"]["objectId"])
            branch = get_related_branch(related_branch)

            if "user" in data:
                related_user = user_get(data["user"]["objectId"])
                user = get_related_user(related_user)
            else:
                user = None

            if (not feedback.comment) or (feedback.comment == ''):
                feedback.action_taken = constants.DEFERRED

            feedback.branch = branch
            feedback.user = user
            feedback.save()

            if "options" in data:
                for option_data in data["options"]:
                    option_parse = option_get(option_data["objectId"])
                    option = get_related_option(option_parse)

                    feedback_option = FeedbackOption.get_if_exists(feedback.id, option.id)
                    if not feedback_option:
                        feedback_option = FeedbackOption()
                        feedback_option.feedback = feedback
                        feedback_option.option = option
                        feedback_option.save()

            try:
                if feedback.is_negative():
                    context = Context({'feedback': feedback})
                    send_negative_feedback_email(context)
            except Exception as e:
                pass

            return parse_response


@api_view(['GET', 'POST'])
@transaction.atomic
def question(request):

    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            question = Question.get_if_exists(data["objectId"])
            if question:
                serializer = QuestionSerializer(question, data=data)
                parse_response = save_and_response(serializer, data)
            else:
                serializer = QuestionSerializer(data=data)
                question = save(serializer)

                parse_response = response(data)

            if "options" in data:
                for option_data in data["options"]:
                    option_parse = option_get(option_data["objectId"])
                    option = get_related_option(option_parse)

                    option.question = question
                    option.save()

            return parse_response
        

#of no use currently
@api_view(['GET', 'POST'])
def option(request):

    if request.method == 'GET':
        options = Option.objects.all()
        serializer = OptionSerializer(options, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            option = Option.get_if_exists(data["objectId"])
            if option:
                serializer = OptionSerializer(option, data=data)
                return save_and_response(serializer, data)
            else:
                serializer = OptionSerializer(data=data)
                option = save(serializer)

                if "subOptions" in data:
                    for sub_option_data in data["subOptions"]:
                        sub_option_parse = option_get(sub_option_data["objectId"])
                        sub_option = get_related_option(sub_option_parse)

                        sub_option.parent = option
                        sub_option.save()

            return response(data)


#of no use currently
@api_view(['GET', 'POST'])
def feedback_option(request):

    if request.method == 'GET':
        feedback_options = FeedbackOption.objects.all()
        serializer = FeedbackOptionSerializer(feedback_options, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            feedback_option = FeedbackOption.get_if_exists(data["objectId"])
            if feedback_option:
                serializer = FeedbackOptionSerializer(feedback_option, data=data)
                return save_and_response(serializer, data)
            else:
                related_feedback = feedback_get(data["feedback"]["objectId"])
                feedback = get_related_feedback(related_feedback)

                related_option = option_get(data["option"]["objectId"])
                option = get_related_option(related_option)

                serializer = FeedbackOptionSerializer(data=data)
                feedback_option = save(serializer)
                feedback_option.feedback = feedback
                feedback_option.option = option
                feedback_option.save()

                try:
                    if feedback_option.is_negative_option():
                        context = Context({'feedback': feedback})
                        send_negative_feedback_email(context)
                except Exception as e:
                    pass

            return response(data)


#NOTE: Please insert questions before inserting the promotion row in Parse
@api_view(['GET', 'POST'])
@transaction.atomic
def promotion(request):

    if request.method == 'GET':
        promotions = Promotion.objects.all()
        serializer = PromotionSerializer(promotions, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data["object"]
        trigger = request.data["triggerName"]

        if trigger == constants.TRIGGER_AFTER_SAVE:
            promotion = Promotion.get_if_exists(data["objectId"])
            if promotion:
                serializer = PromotionSerializer(promotion, data=data)
                parse_response = save_and_response(serializer, data)
            else:
                serializer = PromotionSerializer(data=data)
                promotion = save(serializer)

                parse_response = response(data)

            if "questions" in data:
                question_object_ids = [question_data["objectId"] for question_data in data["questions"]]
                Question.objects.filter(objectId__in=question_object_ids).update(promotion=promotion)

            return parse_response
