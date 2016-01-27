# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0005_userinfo_region'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
