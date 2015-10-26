# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0004_auto_20151021_1359'),
    ]

    operations = [
        migrations.CreateModel(
            name='FollowupOption',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('text', models.CharField(max_length=20)),
                ('objectId', models.CharField(max_length=20)),
                ('parent', models.ForeignKey(blank=True, related_name='children', null=True, to='feedback.FollowupOption')),
            ],
        ),
        migrations.RemoveField(
            model_name='option',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='question',
            name='options',
        ),
        migrations.RemoveField(
            model_name='selectedfeedbackoptions',
            name='feedback',
        ),
        migrations.RemoveField(
            model_name='selectedfeedbackoptions',
            name='option',
        ),
        migrations.RemoveField(
            model_name='selectedfeedbacksuboptions',
            name='option',
        ),
        migrations.RemoveField(
            model_name='selectedfeedbacksuboptions',
            name='selected_feedback_option',
        ),
        migrations.DeleteModel(
            name='Option',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.DeleteModel(
            name='SelectedFeedbackOptions',
        ),
        migrations.DeleteModel(
            name='SelectedFeedbackSubOptions',
        ),
    ]
