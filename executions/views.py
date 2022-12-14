from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied 

from .models import Execution
from .serializers.common import ExecutionSerializer
from trades.models import Trade
from trades.serializers.populated import PopulatedTradeSerializer

from rest_framework.permissions import IsAuthenticated
import datetime

def set_trade_stats(executions, trade):
  serialized_executions = ExecutionSerializer(executions, many=True)
  data = {}

  avg_buy_list = []
  avg_sell_list = []
  total_buy_quantity = []
  total_sell_quantity = []
  total_commission = []
  date_of_execution = []
  trade_closed = ''

  for execution in serialized_executions.data:
    total_commission.append(execution['commissions'])
    date_of_execution.append(execution['date'])
    if execution['action'] == 'buy':
      quantity = float(execution['quantity'])
      price = execution['price']
      total_cost = quantity * price
      avg_buy_list.append(total_cost)
      total_buy_quantity.append(quantity)
    if execution['action'] == 'sell':
      quantity = float(execution['quantity'])
      price = execution['price']
      total_cost = quantity * price
      avg_sell_list.append(total_cost)
      total_sell_quantity.append(quantity)

  if sum(total_buy_quantity) == sum(total_sell_quantity):
    dates_sorted = sorted(date_of_execution)
    trade_closed = dates_sorted[-1]

    avg_buy_price = sum(avg_buy_list) / sum(total_buy_quantity)
    avg_sell_price = sum(avg_sell_list) / sum(total_sell_quantity)
    total_purchase_cost = sum(avg_buy_list)
    gross_return = sum(avg_sell_list) - sum(avg_buy_list)

    data['avg_sell_price'] = round(avg_sell_price, 2)
    data['avg_buy_price'] = round(avg_buy_price, 2)
    data['total_cost'] = round(total_purchase_cost, 2)
    data['gross_return'] = round(gross_return, 2)
    data['net_return'] = round(gross_return - sum(total_commission), 2)
    data['total_commission'] = sum(total_commission)
    data['percent_return'] = round((((gross_return - sum(total_commission))/ total_purchase_cost) * 100), 2)
    
    risk = (avg_buy_price - trade.stoploss) * sum(total_buy_quantity)
    data['net_R'] = round(((gross_return - sum(total_commission)) / risk), 2)
    trade.date_closed = trade_closed


  return data

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
    
    execution_to_add = ExecutionSerializer(data=request.data)
    try:
      if execution_to_add.is_valid():
        execution_to_add.save()
        trade = Trade.objects.get(pk=request.data['trade'])
        executions = Execution.objects.filter(trade=trade)
        # contains all values in the dict even if null
        data = set_trade_stats(executions, trade)

        serialized_trade = PopulatedTradeSerializer(trade, data=data, partial=True)
        if serialized_trade.is_valid():
          serialized_trade.save()

          return Response(serialized_trade.data, status.HTTP_201_CREATED)
        print(serialized_trade.errors)
        return Response(serialized_trade.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
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
      if execution.owner != request.user:
        raise PermissionDenied('Unauthorized')
      execution_to_update = ExecutionSerializer(execution, request.data, partial=True)
      if execution_to_update.is_valid():
        execution_to_update.save()
        trade = Trade.objects.get(pk=request.data['trade'])
        executions = Execution.objects.filter(trade=trade)
        # contains all values in the dict even if null
        data = set_trade_stats(executions, trade)

        serialized_trade = PopulatedTradeSerializer(trade, data=data, partial=True)
        if serialized_trade.is_valid():
          serialized_trade.save()

          return Response(serialized_trade.data, status.HTTP_201_CREATED)
        print(serialized_trade.errors)
        return Response(serialized_trade.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
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