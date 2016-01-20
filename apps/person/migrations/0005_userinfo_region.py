# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('region', '0002_remove_region_objectid'),
        ('person', '0004_auto_20160120_1604'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='region',
            field=models.ForeignKey(related_name='user_info', null=True, to='region.Region', blank=True),
        ),
    ]
