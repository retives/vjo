# Generated by Django 5.2.2 on 2025-06-10 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_activity_end_time_alter_activity_start_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
