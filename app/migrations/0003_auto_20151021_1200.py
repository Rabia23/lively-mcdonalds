# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20151021_0801'),
    ]

    operations = [
        migrations.AddField(
            model_name='branch',
            name='objectId',
            field=models.CharField(default=0, max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userinfo',
            name='objectId',
            field=models.CharField(default=0, max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='branch',
            name='city',
            field=models.ForeignKey(related_name='branches', to='app.City', blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='branch',
            name='user',
            field=models.ForeignKey(related_name='branches', to=settings.AUTH_USER_MODEL, blank=True, null=True),
        ),
    ]
