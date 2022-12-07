from .common import ExecutionSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedExecutionSerializer(ExecutionSerializer):
  owner = UserSerializer()