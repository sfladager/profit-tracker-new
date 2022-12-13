from .common import UserSerializer
from trades.serializers.common import TradeSerializer
from trades.serializers.populated import PopulatedExecutionsSerializer
# PopulatedExecutionsSerializer tried running this serilaizer like for single trade, but won't let me run the get_trade_stats function. 

class PopulatedUserSerializer(UserSerializer):
  trades = PopulatedExecutionsSerializer(many=True)


  # def set_trade_stats(self):
  #   data = self.data

  #   # print(data['executions'])
  #   avg_buy_list = []
  #   avg_sell_list = []
  #   total_buy_quantity = []
  #   total_sell_quantity = []
  #   total_commission = []

  #   for execution in data['executions']:
  #     total_commission.append(execution['commissions'])
  #     if execution['action'] == 'buy':
  #       quantity = float(execution['quantity'])
  #       price = execution['price']
  #       total_cost = quantity * price
  #       avg_buy_list.append(total_cost)
  #       total_buy_quantity.append(quantity)
  #     if execution['action'] == 'sell':
  #       quantity = float(execution['quantity'])
  #       price = execution['price']
  #       total_cost = quantity * price
  #       avg_sell_list.append(total_cost)
  #       total_sell_quantity.append(quantity)
        
  #   # print('BUY LIST', avg_buy_list)
  #   # print('BUY size', total_buy_quantity)
  #   # print('AVG SELL PRICE', sum(avg_sell_list) / sum(total_sell_quantity))

  #   avg_buy_price = sum(avg_buy_list) / sum(total_buy_quantity)
  #   avg_sell_price = sum(avg_sell_list) / sum(total_sell_quantity)
  #   total_purchase_cost = sum(avg_buy_list)
  #   gross_return = sum(avg_sell_list) - sum(avg_buy_list)
  #   data['avg_sell_price'] = avg_sell_price
  #   data['avg_buy_price'] = avg_buy_price
  #   data['total_cost'] = total_purchase_cost
  #   data['gross_return'] = gross_return
  #   data['net_return'] = gross_return - sum(total_commission)
  #   data['total_commission'] = sum(total_commission)
  #   data['percent_return'] = round((((gross_return - sum(total_commission))/ total_purchase_cost) * 100), 2)
    
  #   risk = (avg_buy_price - data['stoploss']) * sum(total_buy_quantity)
  #   data['net_R'] = (gross_return - sum(total_commission)) / risk

  #   return data