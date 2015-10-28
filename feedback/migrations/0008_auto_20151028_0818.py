# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0007_auto_20151027_1402'),
    ]

    operations = [
        migrations.CreateModel(
            name='FeedbackOption',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('objectId', models.CharField(max_length=20)),
                ('feedback', models.ForeignKey(to='feedback.Feedback', null=True, blank=True, related_name='feedback_option')),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('text', models.CharField(max_length=20)),
                ('objectId', models.CharField(max_length=20)),
                ('isNegative', models.BooleanField(default=False)),
                ('parent', models.ForeignKey(to='feedback.Option', null=True, blank=True, related_name='children')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('text', models.CharField(max_length=20)),
                ('isActive', models.BooleanField(default=True)),
                ('type', models.IntegerField()),
                ('objectId', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionOption',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('objectId', models.CharField(max_length=20)),
                ('option', models.ForeignKey(to='feedback.Option', null=True, blank=True, related_name='question_option')),
                ('question', models.ForeignKey(to='feedback.Question', null=True, blank=True, related_name='question_option')),
            ],
        ),
        migrations.AddField(
            model_name='feedbackoption',
            name='question_option',
            field=models.ForeignKey(to='feedback.Option', null=True, blank=True, related_name='feedback_option'),
        ),
    ]
