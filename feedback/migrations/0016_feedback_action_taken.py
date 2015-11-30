# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0015_auto_20151123_1834'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='action_taken',
            field=models.BooleanField(default=False),
        ),
    ]
