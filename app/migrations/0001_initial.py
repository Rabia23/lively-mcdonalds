# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('objectId', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Devices',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('branch', models.ForeignKey(to='app.Branch', related_name='devices')),
            ],
        ),
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('objectId', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('phone_no', models.IntegerField()),
                ('is_customer', models.BooleanField()),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='info')),
            ],
        ),
        migrations.AddField(
            model_name='city',
            name='region',
            field=models.ForeignKey(to='app.Region', related_name='cities'),
        ),
        migrations.AddField(
            model_name='branch',
            name='city',
            field=models.ForeignKey(to='app.City', related_name='branches'),
        ),
        migrations.AddField(
            model_name='branch',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='branches'),
        ),
    ]
