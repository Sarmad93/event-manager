# Generated by Django 2.0.7 on 2018-07-23 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sponser', '0001_initial'),
        ('event', '0003_auto_20180723_0701'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='sponser',
        ),
        migrations.AddField(
            model_name='event',
            name='sponser',
            field=models.ManyToManyField(null=True, to='sponser.Sponser'),
        ),
    ]