# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0017_auto_20151204_1205'),
    ]

    operations = [
        migrations.RenameField(
            model_name='feedback',
            old_name='action_status',
            new_name='action_taken',
        ),
    ]
