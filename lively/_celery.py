__author__ = 'aamish'

import os
from celery import Celery
from django.contrib.auth.models import User
from django.core.mail.message import EmailMultiAlternatives
from django.template.loader import get_template
from apps.review.models import Feedback
from lively import settings as lively_settings
from apps import constants
from celery import shared_task
from django.template import Context

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lively.settings')

from django.conf import settings

app = Celery('lively')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


@shared_task
def send_negative_feedback_email(feedback_json):
    context = Context({'feedback': feedback_json})
    text_template = get_template('emails/negative_feedback.txt')
    html_template = get_template('emails/negative_feedback.html')

    recipients = User.objects.filter(is_staff=True)
    send_mail(constants.NEGATIVE_FEEDBACK_SUBJECT, context, recipients, text_template, html_template)


def send_mail(subject, context, recipients, text_template, html_template):
    email_addresses = [recipient.email for recipient in recipients]
    subject, from_email, to = subject, lively_settings.DEFAULT_FROM_EMAIL, email_addresses
    text_content = text_template.render(context)
    html_content = html_template.render(context)
    message = EmailMultiAlternatives(subject, text_content, from_email, to)
    message.attach_alternative(html_content, "text/html")
    message.send()
