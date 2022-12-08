from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied 

from .models import Execution
from .serializers.common import ExecutionSerializer

from rest_framework.permissions import IsAuthenticated

# Endpoint: executions/
class ExecutionListView(APIView):
  permission_classes = (IsAuthenticated, )
  # GET ALL Executions controller
  # Description: Return all executions related to the trade
  def get(self, _request):
    trade = Execution.objects.all()
    serialized_executions = ExecutionSerializer(trade, many=True)
    return Response(serialized_executions.data)

  # POST Execution controller
  # Description: Adds execution to the specified trade
  def post(self, request):
    
    print("REQUEST USER ->", request.user)
    request.data['owner'] = request.user.id
    print("REQUEST DATA ->", request.data)
    execution_to_add = ExecutionSerializer(data=request.data)
    try:
      if execution_to_add.is_valid():
        execution_to_add.save()
        return Response(execution_to_add.data, status.HTTP_201_CREATED)
      print(execution_to_add.errors)
      return Response(execution_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# Endpoint: executions/:pk
class ExecutionDetailView(APIView):
  permission_classes = (IsAuthenticated, )
  
  def get_execution(self, pk):
    try:
        # Using the get() method we're searching for a record in the books table that has a primary key matching the primary key in the captured value of the request
        return Execution.objects.get(pk=pk)
    except Execution.DoesNotExist as e:
        # The above exceptiom is a Django specific Model error that occurs when the requested resource does not exist.
        print(e) # this e variable is an object created by the DoesNotExist class. This is not serializable, so we convert to a string when sending back to the user
        raise NotFound(str(e))
    except Exception as e:
        print(e)
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  # GET Single Execution controller
  # Description: returns the specified execution
  def get(self, _request, pk):
    trade = self.get_execution(pk)
    # This will return a single object back, we still need to serialize it, but we don't need many=True
    serialized_execution = ExecutionSerializer(trade)
    # Finally as before we send back the serialized data
    return Response(serialized_execution.data)

  # PUT Edit execution controller
  # Description: Edits the specified execution
  def put(self, request, pk):
    try:
      execution = self.get_execution(pk)
      # print('REQUEST USER', request.user)
      # print('EXECUTION OWNER', execution.owner)
      owner = request.data['owner']
      if execution.owner != request.user:
        raise PermissionDenied('Unauthorized')
      execution_to_update = ExecutionSerializer(execution, request.data, partial=True)
      if execution_to_update.is_valid():
        execution_to_update.save()
        return Response(execution_to_update.data, status.HTTP_202_ACCEPTED)
      return Response(execution_to_update.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  # DELETE Execution controller
  # Description: Deletes the specified execution
  def delete(self, request, pk):
    try:
      execution_to_delete = Execution.objects.get(pk=pk)

      print('FOUND COMMENT OWNER', execution_to_delete.owner)
      print('REQUEST USER', request.user)
      if execution_to_delete.owner != request.user:
        raise PermissionDenied('Unauthorised')

      execution_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
    except Execution.DoesNotExist as e:
        print(e)
        raise NotFound(str(e)) 