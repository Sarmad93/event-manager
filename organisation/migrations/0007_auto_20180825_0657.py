# Generated by Django 2.0.7 on 2018-08-25 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0006_auto_20180816_0703'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organisation',
            name='email',
            field=models.EmailField(blank=True, db_index=True, max_length=254, null=True),
        ),
    ]
