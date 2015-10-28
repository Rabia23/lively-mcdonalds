# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0006_selectedfollowupoption'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='followupoption',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='selectedfollowupoption',
            name='feedback',
        ),
        migrations.RemoveField(
            model_name='selectedfollowupoption',
            name='followup_option',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='score',
        ),
        migrations.DeleteModel(
            name='FollowupOption',
        ),
        migrations.DeleteModel(
            name='SelectedFollowupOption',
        ),
    ]
