# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0014_auto_20151123_1746'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='comment',
            field=models.CharField(max_length=1000),
        ),
    ]
