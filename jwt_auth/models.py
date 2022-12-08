from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  email = models.CharField(max_length=50, unique=True)
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  profile_image = models.CharField(max_length=500, default=None, blank=True, null=True )
  # owners_trades = models.ForeignKey(
  #   'trades.Trade', 
  #   related_name='owner_of_trade',
  #   on_delete=models.CASCADE,
  #   default=None, blank=True, null=True
  #   )