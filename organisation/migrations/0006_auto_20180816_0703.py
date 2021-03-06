# Generated by Django 2.0.8 on 2018-08-16 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0005_auto_20180810_0524'),
    ]

    operations = [
        migrations.AddField(
            model_name='organisation',
            name='contact_number',
            field=models.CharField(blank=True, max_length=11),
        ),
        migrations.AddField(
            model_name='organisation',
            name='email',
            field=models.EmailField(db_index=True, default='', max_length=254, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='organisation',
            name='facebook',
            field=models.URLField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='organisation',
            name='twitter',
            field=models.URLField(blank=True, max_length=255),
        ),
    ]
