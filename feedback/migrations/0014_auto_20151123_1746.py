# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0013_auto_20151116_1055'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='comment',
            field=models.CharField(max_length=500),
        ),
    ]
