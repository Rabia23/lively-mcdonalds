# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0024_auto_20151216_1604'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='branch',
            field=models.ForeignKey(related_name='feedback', to='app.Branch'),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='user',
            field=models.ForeignKey(related_name='feedback', to=settings.AUTH_USER_MODEL),
        ),
    ]
