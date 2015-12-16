# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_branch_benchmark_count'),
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('objectId', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='region',
            name='area',
            field=models.ForeignKey(null=True, blank=True, to='app.Area', related_name='regions'),
        ),
    ]
