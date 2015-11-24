from django.core.management.base import BaseCommand
from parse_rest.connection import register
from parse_rest.datatypes import Object
from app.models import UserInfo
from django.conf import settings
from django.contrib.auth.models import User
from lively import utils


class Command(BaseCommand):
    help = 'This Command will take all the data from Parse User table and populate the local django User and user info'\
           ' table'

    def handle(self, *args, **options):
        register(settings.APPLICATION_ID, settings.REST_API_KEY, master_key=settings.MASTER_KEY)
        self.stdout.write('Populating User Info Table')
        parse_user = Object.factory("User")

        all_users = parse_user.Query.all().limit(1000)
        skip_count = 0
        while True:
            for user in all_users:
                first_name = user.first_name if hasattr(user, 'first_name') else ''
                last_name = user.last_name if hasattr(user, 'last_name') else ''
                phone_no = user.phone_no if hasattr(user, 'phone_no') else ''
                is_customer = user.is_customer if hasattr(user, 'is_customer') else True
                username = utils.generate_username()
                self.stdout.write('objectId: ' + user.objectId + 'First Name: ' + first_name + 'Last Name : ' + last_name +
                                  ' Phone No: ' + phone_no)

                django_user = User(first_name=first_name, last_name=last_name, username=username)
                django_user.set_password("1234")
                django_user.save()

                django_user = User.objects.get(username=username)
                local_user_info = UserInfo(user=django_user, phone_no=phone_no, objectId=user.objectId,
                                           is_customer=is_customer)
                local_user_info.save()
            if all_users.count() <= 1000:
                break
            skip_count += 1000
            all_users = parse_user.Query.all().skip(skip_count).limit(1000)

        self.stdout.write('Successfully Populated User and User Info Table')
