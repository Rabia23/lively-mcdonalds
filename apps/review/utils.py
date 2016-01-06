from django.contrib.auth.models import User
from django.core.mail.message import EmailMultiAlternatives
from django.template.loader import get_template
from lively import settings
from apps import constants
from apps.utils import make_request

__author__ = 'aamish'


def feedback_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/Feedback/%s' % object_id, '')
    return response


def send_negative_feedback_email(context):
    text_template = get_template('emails/negative_feedback.txt')
    html_template = get_template('emails/negative_feedback.html')

    recipients = User.objects.filter(is_staff=True)
    send_mail(constants.NEGATIVE_FEEDBACK_SUBJECT, context, recipients, text_template, html_template)


def send_mail(subject, context, recipients, text_template, html_template):
    email_addresses = [recipient.email for recipient in recipients]
    subject, from_email, to = subject, settings.DEFAULT_FROM_EMAIL, email_addresses
    text_content = text_template.render(context)
    html_content = html_template.render(context)
    message = EmailMultiAlternatives(subject, text_content, from_email, to)
    message.attach_alternative(html_content, "text/html")
    message.send()


def generate_missing_actions(data):
    list_actions = [item['action_taken'] for item in data]
    list_feedback = list(data)

    if constants.UNPROCESSED not in list_actions:
        list_feedback.append(
            {'count': 0, 'action_taken': constants.UNPROCESSED}
        )
    if constants.PROCESSED not in list_actions:
        list_feedback.append(
            {'count': 0, 'action_taken': constants.PROCESSED}
        )
    if constants.DEFERRED not in list_actions:
        list_feedback.append(
            {'count': 0, 'action_taken': constants.DEFERRED}
        )

    return list_feedback


# def generate_actions_with_action_texts(data):
#     response_list = []
#     action = "Invalid"
#     for item in data:
#         if item["action_taken"] == constants.PROCESSED:
#             action = "Processed"
#         elif item["action_taken"] == constants.UNPROCESSED:
#             action = "Unprocessed"
#         elif item["action_taken"] == constants.DEFERRED:
#             action = "Deferred"
#         response_list.append({'count': item["count"], 'action_taken': action})
#     return response_list


def valid_action_id(action_id):
    return True if action_id == 1 or action_id == 2 or action_id ==3 else False