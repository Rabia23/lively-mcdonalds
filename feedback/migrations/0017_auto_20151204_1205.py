# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0016_feedback_action_taken'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='action_taken',
        ),
        migrations.AddField(
            model_name='feedback',
            name='action_status',
            field=models.IntegerField(default=1),
        ),
    ]
