# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0002_feedback_gro_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='feedback',
            old_name='gro_id',
            new_name='gro',
        ),
    ]
