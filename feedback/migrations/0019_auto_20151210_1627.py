# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0018_auto_20151204_1214'),
    ]

    operations = [
        migrations.CreateModel(
            name='Promotion',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('title', models.TextField()),
                ('isActive', models.BooleanField(default=True)),
                ('objectId', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='isPromotion',
            field=models.BooleanField(default=True),
        ),
    ]
