# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0002_remove_feedback_device'),
        ('app', '0003_auto_20151021_1200'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='devices',
            name='branch',
        ),
        migrations.DeleteModel(
            name='Devices',
        ),
    ]
