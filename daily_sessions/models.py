from django.db import models

# Create your models here.
class Session(models.Model):
  session_date = models.DateField()
  session_rating = models.PositiveIntegerField()
  session_notes = models.TextField()
  session_trades = models.ForeignKey(
    'trades.Trade', 
    related_name='daily_sessions',
    on_delete=models.PROTECT,
    default=None, blank=True, null=True
    )
  owner_of_session = models.ForeignKey(
    'jwt_auth.User',
    related_name='daily_sessions',
    on_delete=models.PROTECT
  )


  def __str__(self):
    return f"{self.session_date} - {self.session_rating}"