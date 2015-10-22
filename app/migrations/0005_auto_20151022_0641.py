# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20151021_1235'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='phone_no',
            field=models.CharField(max_length=20),
        ),
    ]
