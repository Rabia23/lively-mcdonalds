# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0027_auto_20151216_1719'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='comment',
            field=models.CharField(null=True, max_length=1000, blank=True, db_index=True),
        ),
    ]
