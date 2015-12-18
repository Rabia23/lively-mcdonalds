# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('text', models.CharField(max_length=255)),
                ('objectId', models.CharField(db_index=True, max_length=20)),
                ('score', models.IntegerField(default=0, db_index=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('parent', models.ForeignKey(to='option.Option', null=True, related_name='children', blank=True)),
                ('question', models.ForeignKey(to='question.Question', null=True, related_name='options', blank=True)),
            ],
        ),
    ]
