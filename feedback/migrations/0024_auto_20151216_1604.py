# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0023_option_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 16, 11, 4, 14, 945538, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='promotion',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 16, 11, 4, 20, 793565, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='question',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2015, 12, 16, 11, 4, 23, 689235, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='option',
            name='objectId',
            field=models.CharField(db_index=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='option',
            name='text',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='promotion',
            name='title',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='question',
            name='text',
            field=models.CharField(max_length=255),
        ),
    ]
