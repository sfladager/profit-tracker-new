# Generated by Django 4.1.4 on 2022-12-08 11:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trades', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='trade',
            name='owner_of_trade',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.PROTECT, related_name='trades', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]