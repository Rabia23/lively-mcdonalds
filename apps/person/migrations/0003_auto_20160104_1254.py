# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0002_auto_20160104_1244'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='objectId',
            field=models.CharField(max_length=20, null=True, blank=True, db_index=True),
        ),
    ]
