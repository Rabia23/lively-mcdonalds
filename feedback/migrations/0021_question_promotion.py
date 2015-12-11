# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0020_remove_feedbackoption_objectid'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='promotion',
            field=models.ForeignKey(to='feedback.Promotion', related_name='promotion', null=True, blank=True),
        ),
    ]
