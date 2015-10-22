# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20151022_0641'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True, related_name='info', blank=True),
        ),
    ]
