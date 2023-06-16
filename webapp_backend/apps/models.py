from django.db import models

class User(models.Model):
    class Meta:
        db_table = 'user'
    email = models.EmailField(max_length=64, primary_key=True)
    password = models.CharField(max_length=64)
    first_name = models.CharField(max_length=32)
    middle_name = models.CharField(max_length=32, blank=True)
    last_name = models.CharField(max_length=32)
    avatar = models.ImageField(blank=True)
    phonenumber = models.IntegerField(max_length=10)
    birth = models.DateField()

class Category(models.Model):
    class Meta:
        db_table = 'category'
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)

class Item(models.Model):
    class Meta:
        db_table = 'item'
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    owner_email = models.ForeignKey(to=User, on_delete=models.CASCADE)
    category_id = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    description = models.TextField()

class ItemImg(models.Model):
    class Meta:
        db_table = 'item_img'
    id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(to=Item, on_delete=models.CASCADE, primary_key=True)
    img = models.ImageField()