# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('branch', '0002_remove_branch_objectid'),
        ('person', '0003_auto_20160104_1254'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='branch',
            field=models.ForeignKey(related_name='user_info', null=True, blank=True, to='branch.Branch'),
        ),
        migrations.AddField(
            model_name='userinfo',
            name='parent',
            field=models.ForeignKey(related_name='children', null=True, blank=True, to='person.UserInfo'),
        ),
    ]
