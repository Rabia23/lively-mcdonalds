# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20151116_1056'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='latitude',
            field=models.DecimalField(blank=True, max_digits=12, decimal_places=8, null=True),
        ),
        migrations.AlterField(
            model_name='branch',
            name='longitude',
            field=models.DecimalField(blank=True, max_digits=12, decimal_places=8, null=True),
        ),
    ]
