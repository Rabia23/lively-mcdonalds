# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0022_feedback_gro_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='code',
            field=models.CharField(max_length=20, default=''),
            preserve_default=False,
        ),
    ]
