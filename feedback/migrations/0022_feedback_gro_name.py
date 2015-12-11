# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0021_question_promotion'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='gro_name',
            field=models.CharField(max_length=25, blank=True, null=True),
        ),
    ]
