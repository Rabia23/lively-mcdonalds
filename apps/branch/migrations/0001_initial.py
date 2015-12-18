# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('city', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('objectId', models.CharField(db_index=True, max_length=20)),
                ('latitude', models.DecimalField(max_digits=20, decimal_places=16)),
                ('longitude', models.DecimalField(max_digits=20, decimal_places=16)),
                ('benchmark_count', models.IntegerField(db_index=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('city', models.ForeignKey(to='city.City', related_name='branches')),
            ],
            options={
                'verbose_name_plural': 'Branches',
                'verbose_name': 'Branch',
            },
        ),
    ]
