# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0005_auto_20151026_1255'),
    ]

    operations = [
        migrations.CreateModel(
            name='SelectedFollowupOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('objectId', models.CharField(max_length=20)),
                ('feedback', models.ForeignKey(blank=True, related_name='selected_option', null=True, to='feedback.Feedback')),
                ('followup_option', models.ForeignKey(blank=True, related_name='selected_option', null=True, to='feedback.FollowupOption')),
            ],
        ),
    ]
