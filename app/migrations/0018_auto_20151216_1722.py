# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_auto_20151216_1604'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='branch',
            name='user',
        ),
        migrations.AlterField(
            model_name='area',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='area',
            name='objectId',
            field=models.CharField(max_length=20, db_index=True),
        ),
        migrations.AlterField(
            model_name='branch',
            name='benchmark_count',
            field=models.IntegerField(db_index=True),
        ),
        migrations.AlterField(
            model_name='branch',
            name='city',
            field=models.ForeignKey(related_name='branches', to='app.City'),
        ),
        migrations.AlterField(
            model_name='branch',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='branch',
            name='objectId',
            field=models.CharField(max_length=20, db_index=True),
        ),
        migrations.AlterField(
            model_name='city',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='city',
            name='objectId',
            field=models.CharField(max_length=20, db_index=True),
        ),
        migrations.AlterField(
            model_name='city',
            name='region',
            field=models.ForeignKey(related_name='cities', to='app.Region'),
        ),
        migrations.AlterField(
            model_name='region',
            name='area',
            field=models.ForeignKey(related_name='regions', to='app.Area'),
        ),
        migrations.AlterField(
            model_name='region',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='region',
            name='objectId',
            field=models.CharField(max_length=20, db_index=True),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='is_customer',
            field=models.BooleanField(db_index=True),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='objectId',
            field=models.CharField(max_length=20, db_index=True),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='phone_no',
            field=models.CharField(max_length=20, blank=True, null=True, db_index=True),
        ),
    ]
