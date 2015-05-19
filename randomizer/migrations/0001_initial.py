# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('status', models.CharField(max_length=3)),
                ('time_to_send', models.DateTimeField()),
                ('email', models.CharField(max_length=20)),
                ('phone', models.CharField(max_length=20)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Query',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('creation_time', models.DateTimeField()),
                ('result_time', models.DateTimeField()),
                ('password', models.CharField(max_length=50)),
                ('query_type', models.CharField(max_length=1)),
                ('query_text', models.CharField(max_length=2000)),
                ('result', models.CharField(max_length=2000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Queue',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('notification_time', models.DateTimeField()),
                ('notification_id', models.OneToOneField(to='randomizer.Notification')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='notification',
            name='query_id',
            field=models.ForeignKey(to='randomizer.Query'),
            preserve_default=True,
        ),
    ]
