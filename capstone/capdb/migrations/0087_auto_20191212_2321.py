# Generated by Django 2.2.8 on 2019-12-12 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capdb', '0086_auto_20191216_1803'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalvolumemetadata',
            name='volume_number_slug',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name='volumemetadata',
            name='volume_number_slug',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]