from apps.review.models import Concern, Feedback

__author__ = 'aamish'

from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):

        for feedback in Feedback.objects.all():
            if feedback.comment_exists() and feedback.is_negative():
                feedback.mark_deferred_if_positive_and_no_comment()
                self.stdout.write("Mark Deferred")

        self.stdout.write("Successfully updated all feedback statuses")