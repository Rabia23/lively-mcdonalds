# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0025_auto_20151216_1629'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, blank=True, related_name='feedback', null=True),
        ),
        migrations.AlterField(
            model_name='feedbackoption',
            name='feedback',
            field=models.ForeignKey(related_name='feedback_option', to='feedback.Feedback'),
        ),
        migrations.AlterField(
            model_name='feedbackoption',
            name='option',
            field=models.ForeignKey(related_name='feedback_option', to='feedback.Option'),
        ),
    ]
