from django.db import models


class User(models.Model):
    email = models.EmailField(max_length=64, primary_key=True)
    password = models.CharField(max_length=64)
    first_name = models.CharField(max_length=32)
    middle_name = models.CharField(max_length=32, blank=True)
    last_name = models.CharField(max_length=32)
    avatar = models.ImageField(blank=True)
    phonenumber = models.IntegerField()
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
    owner_email = models.ForeignKey(to=User, on_delete=models.CASCADE)
    category_id = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    description = models.TextField()

    class Meta:
        db_table = 'item'


class ItemImg(models.Model):
    id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(to=Item, on_delete=models.CASCADE)
    img = models.ImageField()

    class Meta:
        db_table = 'item_img'
        unique_together = (('item_id', 'id'))