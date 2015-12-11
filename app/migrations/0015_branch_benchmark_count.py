# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_auto_20151210_1627'),
    ]

    operations = [
        migrations.AddField(
            model_name='branch',
            name='benchmark_count',
            field=models.IntegerField(default=200),
            preserve_default=False,
        ),
    ]
