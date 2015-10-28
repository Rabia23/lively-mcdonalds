# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0009_auto_20151028_0918'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='questionoption',
            name='option',
        ),
        migrations.RemoveField(
            model_name='questionoption',
            name='question',
        ),
        migrations.RenameField(
            model_name='feedbackoption',
            old_name='question_option',
            new_name='option',
        ),
        migrations.AddField(
            model_name='option',
            name='question',
            field=models.ForeignKey(related_name='options', blank=True, to='feedback.Question', null=True),
        ),
        migrations.DeleteModel(
            name='QuestionOption',
        ),
    ]
