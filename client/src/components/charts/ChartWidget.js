
import { useEffect } from 'react'

const ChartWidget = ({ trade }) => {

  useEffect(() => {
    new TradingView.widget(
      {
        'autosize': true,
        'symbol': trade.symbol,
        'interval': trade.timeframe,
        'timezone': 'Etc/UTC',
        'theme': 'light',
        'style': '1',
        'locale': 'en',
        'toolbar_bg': '#f1f3f6',
        'enable_publishing': false,
        'allow_symbol_change': true,
        'container_id': 'tradingview_38969',
      }
    )
  }, [trade])

  return (
    <div className="tradingview-chart-container">
      <div id="tradingview_38969">
      </div>
    </div>
  )
}

export default ChartWidget