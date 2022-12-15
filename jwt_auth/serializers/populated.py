from .common import UserSerializer
from trades.serializers.common import TradeSerializer
from itertools import accumulate

class PopulatedUserSerializer(UserSerializer):
  trades = TradeSerializer(many=True)


  def set_account_stats(self):
    data = self.data

    total_return = []
    win = []
    loss = []
    cumulative_sum = []
    account_value = 0

    # loop through trades to select trades that have a net_return
    for trade in data['trades']:
      if trade['net_return']:
        total_return.append(trade['net_return'])
        if trade['net_return'] > 0:
          win.append(trade['net_return'])
        if trade['net_return'] < 0:
          loss.append(trade['net_return'])
    
    for i in total_return:
      account_value += i
      cumulative_sum.append(round(account_value, 2))
  
    data['total_return'] = round(account_value, 2)
    data['total_trades'] = len(data['trades'])
    data['avg_return_per_trade'] = round(sum(total_return) / len(data['trades']), 2)
    data['win_ratio'] = '100%' if len(loss) == 0 else round((len(win)/ (len(win) + len(loss))) * 100)
    data['account_value'] = cumulative_sum


    return data