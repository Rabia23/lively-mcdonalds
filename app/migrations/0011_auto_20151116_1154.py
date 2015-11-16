# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_auto_20151116_1131'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='branch',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='branch',
            name='longitude',
        ),
        migrations.AddField(
            model_name='branch',
            name='location',
            field=models.CharField(max_length=50, default=(0, 0)),
            preserve_default=False,
        ),
    ]
