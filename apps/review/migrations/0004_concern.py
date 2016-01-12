# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0003_auto_20160106_1535'),
    ]

    operations = [
        migrations.CreateModel(
            name='Concern',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('keyword', models.CharField(max_length=255, db_index=True, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(db_index=True, auto_now_add=True)),
            ],
        ),
    ]
