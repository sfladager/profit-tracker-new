from .common import UserSerializer
from trades.serializers.common import TradeSerializer
from trades.serializers.populated import PopulatedTradeSerializer

class PopulatedUserSerializer(UserSerializer):
  trades = TradeSerializer(many=True)


  def set_account_stats(self):
    data = self.data

    total_return = []
    win = []
    loss = []


    for trade in data['trades']:
      print('TRADE', trade['date_closed'])
      total_return.append(trade['net_return'])
      if trade['net_return'] > 0:
        win.append(trade['net_return'])
      if trade['net_return'] < 0:
        loss.append(trade['net_return'])
        

  
  
    data['total_return'] = round(sum(total_return), 2)
    data['total_trades'] = len(data['trades'])
    data['avg_return_per_trade'] = round(sum(total_return) / len(data['trades']), 2)
    data['win_ratio'] = '100%' if len(loss) == 0 else round((len(loss)/len(win)) * 100)
    


    return data