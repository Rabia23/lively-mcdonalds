from apps.review.models import Concern

__author__ = 'aamish'

from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):
        list = ["bun", "patty", "fries", "menu", "music", "ambiance", "price", "late order", "slow", "bathroom", "ketchup", "melt", "fly", "flies", "promotion", "new items", "lettuce"]

        for concern in list:
            Concern.objects.create(keyword=concern)
            self.stdout.write(concern)

        self.stdout.write("Successfully added Concerns")