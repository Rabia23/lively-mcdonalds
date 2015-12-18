# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('promotion', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('text', models.CharField(max_length=255)),
                ('isActive', models.BooleanField(default=True, db_index=True)),
                ('type', models.IntegerField(db_index=True)),
                ('objectId', models.CharField(db_index=True, max_length=20)),
                ('isPromotion', models.BooleanField(default=True, db_index=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('promotion', models.ForeignKey(to='promotion.Promotion', null=True, related_name='promotion', blank=True)),
            ],
        ),
    ]
