import csv
from apps.review.models import Feedback

__author__ = 'aamish'

from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):

        file = open('eggs.csv','w')
        try:
            writer = csv.writer(file)
            writer.writerow( ('Title 1', 'Title 2', 'Title 3') )
            for i in range(10):
                writer.writerow( (i+1, chr(ord('a') + i), '08/%02d/07' % (i+1)) )
        finally:
            file.close()

        self.stdout.write("Successfully Created")
