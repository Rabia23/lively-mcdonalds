# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0012_auto_20151030_1015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='objectId',
            field=models.CharField(max_length=20, null=True, blank=True),
        ),
    ]
