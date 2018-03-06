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
            name='dataGroup',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('groupname', models.TextField(unique=True)),
                ('description', models.TextField(max_length=51200)),
                ('member', models.TextField()),
                ('data', models.TextField()),
                ('invite_code', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('groups', models.TextField(max_length=51200)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='datagroup',
            name='owner',
            field=models.ForeignKey(to='provide.UserProfile'),
        ),
    ]
