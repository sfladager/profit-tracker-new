from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied


# import model and serializers
from .models import Trade
from .serializers.common import TradeSerializer
from .serializers.populated import PopulatedTradeSerializer
from .forms.form import TradeForm
from .serializers.form_serializer import TradeFormSerializer

from rest_framework.renderers import TemplateHTMLRenderer


# Authentication
from rest_framework.permissions import IsAuthenticated

# Endpoint: /trades/
class TradeListView(APIView):
  permission_classes = (IsAuthenticated, )
  # GET all trades controller
  # Description: returns all trades found back to user
  def get(self, _request):
    trades = Trade.objects.all()
    serialized_trades = TradeSerializer(trades, many=True)
    return Response(serialized_trades.data)
  
  # POST add Trade controller
  # Description: adds a trade to the user trades
  def post(self, request):
    # print('REQUEST POST ', request.data)
    trade_to_add = TradeSerializer(data=request.data)
    try:
      if trade_to_add.is_valid():
        trade_to_add.save()
        return Response(trade_to_add.data, status.HTTP_201_CREATED)
      raise ValidationError(trade_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)
  
# Endpoint: /trades/:pk
class TradeDetailView(APIView):
  permission_classes = (IsAuthenticated, )
  # Custom function to get id of trade for each query
  def get_trade(self, pk):
    try:
      return Trade.objects.get(pk=pk)
    except Trade.DoesNotExist as e:
      print(e)
      raise NotFound(str(e))
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  # GET single Trade controller
  # Description: queries a single trade from the user
  def get(self, request, pk):
    trade = self.get_trade(pk)
    if trade.owner_of_trade != request.user:
      raise PermissionDenied('Unauthorized')
    serialized_trade = PopulatedTradeSerializer(trade)
    # trade_with_stats = serialized_trade.set_trade_stats()
    return Response(serialized_trade.data)
  
  # Put edit Trade controller
  # Description: adds a trade to the user trades
  def put(self, request, pk):
    trade = self.get_trade(pk)
    if trade.owner_of_trade != request.user:
      raise PermissionDenied('Unauthorized')

    try:
      trade_to_serialize = TradeSerializer(trade, request.data, partial=True)
      if trade_to_serialize.is_valid():
        trade_to_serialize.save()
        return Response(trade_to_serialize.data, status.HTTP_202_ACCEPTED)
      return Response(trade_to_serialize.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)
  
  # DELETE Trade controller
  # Description: deletes a trade to the user trades
  def delete(self, _request, pk):
    trade_to_delete = self.get_trade(pk)
    trade_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
# Endpoint: /trades/form
class TradeFormView(APIView):
  permission_classes = (IsAuthenticated, )
  # renderer_classes = [TemplateHTMLRenderer]
  # template_name = 'rest_framework/vertical/form.html'

  def get(self, _request):
    
    fields = Trade._meta.fields
    fields_with_choices = [{'name': field.name, 'choices': field.choices} for field in fields if field.choices]
    print(fields_with_choices)
      # print(field.name, field.choices)
    # serialized_form = TradeFormSerializer(form.fields)
    # print(serialized_form.data)
    return Response(fields_with_choices)