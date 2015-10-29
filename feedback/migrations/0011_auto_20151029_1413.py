# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0010_auto_20151028_1125'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='option',
            name='isNegative',
        ),
        migrations.AddField(
            model_name='option',
            name='score',
            field=models.IntegerField(default=0),
        ),
    ]
