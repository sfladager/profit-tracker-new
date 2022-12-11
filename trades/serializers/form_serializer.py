from rest_framework import serializers
from ..forms.form import TradeForm

class TradeFormSerializer(serializers.ModelSerializer):
  class Meta:
    model = TradeForm
    fields = '__all__'