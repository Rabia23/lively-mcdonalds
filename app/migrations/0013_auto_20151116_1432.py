# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_auto_20151116_1209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='latitude',
            field=models.DecimalField(max_digits=20, decimal_places=16),
        ),
        migrations.AlterField(
            model_name='branch',
            name='longitude',
            field=models.DecimalField(max_digits=20, decimal_places=16),
        ),
    ]
