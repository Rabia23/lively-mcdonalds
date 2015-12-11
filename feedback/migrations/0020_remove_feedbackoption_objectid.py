# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0019_auto_20151210_1627'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedbackoption',
            name='objectId',
        ),
    ]
