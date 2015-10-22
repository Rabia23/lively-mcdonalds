# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20151021_1235'),
        ('feedback', '0002_remove_feedback_device'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='branch',
            field=models.ForeignKey(default=0, to='app.Branch'),
            preserve_default=False,
        ),
    ]
