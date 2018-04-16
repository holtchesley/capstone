# Generated by Django 2.0.2 on 2018-03-20 19:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('capdb', '0028_auto_20180319_2038'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casemetadata',
            name='case_id',
            field=models.CharField(db_index=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='casemetadata',
            name='reporter',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, related_name='case_metadatas', to='capdb.Reporter'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='casemetadata',
            name='volume',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, related_name='case_metadatas', to='capdb.VolumeMetadata'),
            preserve_default=False,
        ),
    ]