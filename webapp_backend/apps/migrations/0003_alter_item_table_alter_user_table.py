# Generated by Django 4.2.1 on 2023-06-16 15:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0002_alter_item_table_alter_user_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='item',
            table='item',
        ),
        migrations.AlterModelTable(
            name='user',
            table='user',
        ),
    ]
