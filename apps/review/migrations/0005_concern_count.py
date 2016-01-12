# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0004_concern'),
    ]

    operations = [
        migrations.AddField(
            model_name='concern',
            name='count',
            field=models.IntegerField(db_index=True, default=0),
        ),
    ]
