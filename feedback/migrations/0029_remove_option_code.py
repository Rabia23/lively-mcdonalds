# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0028_auto_20151216_2025'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='option',
            name='code',
        ),
    ]
