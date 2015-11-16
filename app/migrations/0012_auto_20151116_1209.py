# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_auto_20151116_1154'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='branch',
            name='location',
        ),
        migrations.AddField(
            model_name='branch',
            name='latitude',
            field=models.DecimalField(default=0.0, decimal_places=8, max_digits=12),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='branch',
            name='longitude',
            field=models.DecimalField(default=0.0, decimal_places=8, max_digits=12),
            preserve_default=False,
        ),
    ]
