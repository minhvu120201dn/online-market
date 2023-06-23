from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=64, unique=True)
    password = models.CharField(max_length=64)
    first_name = models.CharField(max_length=32)
    middle_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    avatar = models.ImageField(null=True, upload_to='user_avatars/')
    phonenumber = PhoneNumberField(unique=True)
    birth = models.DateField()

    class Meta:
        db_table = 'user'


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)

    class Meta:
        db_table = 'category'


class Item(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    owner_id = models.ForeignKey(to=User, on_delete=models.CASCADE)
    category_id = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    description = models.TextField()
    img = models.ImageField()

    class Meta:
        db_table = 'item'


class ItemImg(models.Model):
    id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(to=Item, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='item_imgs/')

    class Meta:
        db_table = 'item_img'
        unique_together = (('item_id', 'id'))