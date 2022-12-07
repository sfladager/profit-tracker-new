from .common import TradeSerializer

from executions.serializers.common import ExecutionSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedExecutionsSerializer(TradeSerializer):
  executions = ExecutionSerializer(many=True)