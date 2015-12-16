# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_auto_20151216_1255'),
    ]

    operations = [
        migrations.AddField(
            model_name='area',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 16, 11, 3, 59, 360950, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='branch',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 16, 11, 4, 2, 864971, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='city',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 16, 11, 4, 5, 753168, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='region',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 16, 11, 4, 9, 42474, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userinfo',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 16, 11, 4, 11, 657198, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
