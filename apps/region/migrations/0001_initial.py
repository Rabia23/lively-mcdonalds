# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('area', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('objectId', models.CharField(db_index=True, max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('area', models.ForeignKey(to='area.Area', related_name='regions')),
            ],
        ),
    ]
