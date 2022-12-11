
from django.forms import ModelForm
from trades.models import Trade

class TradeForm(ModelForm):
  class Meta:
    model = Trade
    fields = '__all__'