from .common import SessionSerializer
from trades.serializers.common import TradeSerializer

class PopulatedSessionSerializer(SessionSerializer):
  session_trades = TradeSerializer(many=True)