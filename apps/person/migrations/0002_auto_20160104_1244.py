# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinfo',
            name='is_customer',
        ),
        migrations.AddField(
            model_name='userinfo',
            name='role',
            field=models.IntegerField(db_index=True, default=1),
        ),
    ]
