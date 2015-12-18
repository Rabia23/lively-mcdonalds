# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('phone_no', models.CharField(max_length=20, blank=True, db_index=True, null=True)),
                ('is_customer', models.BooleanField(db_index=True)),
                ('objectId', models.CharField(db_index=True, max_length=20)),
                ('created_at', models.DateTimeField(db_index=True, auto_now_add=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='info')),
            ],
        ),
    ]
