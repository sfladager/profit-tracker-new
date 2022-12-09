from django.db import models

class Trade(models.Model):
  TYPE_OF_ASSET = (
    (None, 'Select Asset'),
    ('stocks', 'Stocks'),
    ('crypto', 'Crypto'),
    ('forex', 'Forex'),
    ('futures', 'Futures'),
    ('options', 'Options'),
    ('bonds', 'Bonds'),
  )
  TYPE_OF_TRADE = (
        (None, 'Select Type'),
        ('DT', 'Day Trade'),
        ('ST', 'Swing'),
        ('LT', 'Long Term'),
    )
  date_opened = models.DateField()
  date_closed = models.DateField(blank=True, default=None, null=True)  
  asset_class = models.CharField(max_length=7, choices=TYPE_OF_ASSET, default=None)
  trade_type = models.CharField(max_length=2, choices=TYPE_OF_TRADE, default=None)
  side = models.TextChoices('positionType', 'Long Short')
  symbol = models.CharField(max_length=15)
  timeframe_day = models.PositiveIntegerField(blank=True, default=None, null=True)  
  timeframe_min = models.PositiveIntegerField(blank=True, default=None, null=True)
  target = models.FloatField(blank=True, default=None, null=True)
  stoploss = models.FloatField(blank=True, default=None, null=True)
  expected_r = models.FloatField(blank=True, default=None, null=True)
  setup = models.CharField(max_length=100)
  mistakes = models.CharField(max_length=200)
  notes = models.TextField()
  owner_of_trade = models.ForeignKey(
    'jwt_auth.User',
    related_name='trades',
    blank=True,
    default=None,
    null=True,
    on_delete=models.PROTECT
  )
  
  def __str__(self):
    return f"{self.date_opened} | {self.asset_class} | {self.symbol}"

