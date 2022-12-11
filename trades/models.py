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
  POSITION_TYPE = (
    (None, 'Select Type'),
    ('long', 'Long'),
    ('short', 'Short'),
  )
  TIMEFRAME_OPTIONS = (
      (None, 'Select Timeframe'),
      ('1', '1 min'),
      ('2', '2 min'),
      ('3', '3 min'),
      ('5', '5 min'),
      ('10', '10 min'),
      ('15', '15 min'),
      ('30', '30 min'),
      ('60', '60 min'),
      ('1 hour', '1 hour'),
      ('4 hour', '4 hour'),
      ('daily', 'Daily'),
      ('weekly', 'Weekly'),
    )
  date_opened = models.DateField()
  date_closed = models.DateField(blank=True, default=None, null=True)  
  asset_class = models.CharField(max_length=7, choices=TYPE_OF_ASSET, default=None)
  trade_type = models.CharField(max_length=2, choices=TYPE_OF_TRADE, default=None)
  side = models.CharField(max_length=5, choices=POSITION_TYPE, default=None)
  symbol = models.CharField(max_length=15)
  timeframe = models.CharField(max_length=10, choices=TIMEFRAME_OPTIONS, default=None)
  target = models.FloatField(blank=True, default=None, null=True)
  stoploss = models.FloatField(blank=True, default=None, null=True)
  expected_r = models.FloatField(blank=True, default=None, null=True)
  avg_buy_price = models.FloatField(blank=True, default=None, null=True)
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

