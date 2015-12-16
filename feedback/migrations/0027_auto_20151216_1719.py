# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0026_auto_20151216_1710'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='action_taken',
            field=models.IntegerField(db_index=True, default=1),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='comment',
            field=models.CharField(db_index=True, max_length=1000),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='created_at',
            field=models.DateTimeField(db_index=True, auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='gro_name',
            field=models.CharField(null=True, db_index=True, max_length=25, blank=True),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='objectId',
            field=models.CharField(null=True, db_index=True, max_length=20, blank=True),
        ),
        migrations.AlterField(
            model_name='feedbackoption',
            name='created_at',
            field=models.DateTimeField(db_index=True, auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='option',
            name='code',
            field=models.CharField(db_index=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='option',
            name='created_at',
            field=models.DateTimeField(db_index=True, auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='option',
            name='score',
            field=models.IntegerField(db_index=True, default=0),
        ),
        migrations.AlterField(
            model_name='promotion',
            name='created_at',
            field=models.DateTimeField(db_index=True, auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='promotion',
            name='isActive',
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name='promotion',
            name='objectId',
            field=models.CharField(db_index=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='question',
            name='created_at',
            field=models.DateTimeField(db_index=True, auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='isActive',
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='isPromotion',
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='objectId',
            field=models.CharField(db_index=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='question',
            name='type',
            field=models.IntegerField(db_index=True),
        ),
    ]
