from .common import UserSerializer
from trades.serializers.common import TradeSerializer

class PopulatedUserSerializer(UserSerializer):
  trades = TradeSerializer(many=True)