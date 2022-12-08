from django.db import models

class Execution(models.Model):
  BUY_OR_SELL = (
        (None, 'Select Action'),
        ('buy', 'buy'),
        ('sell', 'sell'),
    )
  action = models.CharField(max_length=4, choices=BUY_OR_SELL, default=None)
  date = models.DateField()
  time = models.TimeField()
  quantity = models.PositiveIntegerField()
  price = models.FloatField()
  commissions = models.FloatField(default=0)
  trade = models.ForeignKey(
    'trades.Trade',
    related_name='executions',
    on_delete=models.CASCADE
  )
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='executions',
    on_delete=models.CASCADE
  )

  def __str__(self):
    return f"{self.date} | {self.action} | {self.quantity} - {self.price}"