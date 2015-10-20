# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('comment', models.TextField()),
                ('score', models.IntegerField()),
                ('device', models.ForeignKey(to='app.Devices')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('text', models.CharField(max_length=20)),
                ('parent', models.ForeignKey(null=True, related_name='children', to='feedback.Option', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('text', models.TextField()),
                ('options', models.ManyToManyField(to='feedback.Option')),
            ],
        ),
        migrations.CreateModel(
            name='SelectedFeedbackOptions',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('feedback', models.ForeignKey(to='feedback.Feedback')),
                ('option', models.ForeignKey(to='feedback.Option')),
            ],
        ),
        migrations.CreateModel(
            name='SelectedFeedbackSubOptions',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('option', models.ForeignKey(to='feedback.Option')),
                ('selected_feedback_option', models.ForeignKey(to='feedback.SelectedFeedbackOptions')),
            ],
        ),
    ]
