# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('option', '0001_initial'),
        ('branch', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('comment', models.CharField(blank=True, max_length=1000, null=True, db_index=True)),
                ('objectId', models.CharField(blank=True, max_length=20, null=True, db_index=True)),
                ('action_taken', models.IntegerField(default=1, db_index=True)),
                ('gro_name', models.CharField(blank=True, max_length=25, null=True, db_index=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('branch', models.ForeignKey(related_name='feedback', to='branch.Branch')),
                ('user', models.ForeignKey(related_name='feedback', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FeedbackOption',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('feedback', models.ForeignKey(related_name='feedback_option', to='review.Feedback')),
                ('option', models.ForeignKey(related_name='feedback_option', to='option.Option')),
            ],
        ),
    ]
