from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  email = models.CharField(max_length=50, unique=True)
  first_name = models.CharField(max_length=50, default=None, blank=True, null=True)
  last_name = models.CharField(max_length=50, default=None, blank=True, null=True)
  profile_image = models.CharField(max_length=500, default='https://res.cloudinary.com/dubrvgdmq/image/upload/v1670691830/SPROUT_ANYWHERE_BLOG/bc9klaeyfkghon15vwdy.png')