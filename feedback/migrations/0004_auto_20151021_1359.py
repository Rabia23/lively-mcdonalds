# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0003_feedback_branch'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='objectId',
            field=models.CharField(max_length=20, default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='feedback',
            name='branch',
            field=models.ForeignKey(related_name='feedback', null=True, blank=True, to='app.Branch'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='user',
            field=models.ForeignKey(related_name='feedback', null=True, blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
