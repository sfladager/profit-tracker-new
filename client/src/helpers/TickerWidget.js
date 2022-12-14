import { useEffect, useState } from 'react'



const TickerWidget = () => {

  const [ widget, setWidget ] = useState([])

  // useEffect(() => {
  //   setWidget(
  //     [
  //       {
  //         'symbols': [
  //           {
  //             'proName': 'FOREXCOM:SPXUSD',
  //             'title': 'S&P 500',
  //           },
  //           {
  //             'proName': 'FX_IDC:EURUSD',
  //             'title': 'EUR/USD',
  //           },
  //           {
  //             'proName': 'BITSTAMP:BTCUSD',
  //             'title': 'Bitcoin',
  //           },
  //           {
  //             'proName': 'BITSTAMP:ETHUSD',
  //             'title': 'Ethereum',
  //           },
  //           {
  //             'description': 'QQQ',
  //             'proName': 'NASDAQ:QQQ',
  //           },
  //           {
  //             'description': 'Gold',
  //             'proName': 'TVC:GOLD',
  //           },
  //           {
  //             'description': 'Russell 2000',
  //             'proName': 'AMEX:IWM',
  //           }
  //         ],
  //       },
  //       { 
  //         'showSymbolLogo': true
  //         'colorTheme': 'light'
  //         'isTransparent': false
  //         'displayMode': 'adaptive'
  //         'locale': 'en'
  //       }
  //     ]
  //   )
  // }, [])
    
  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget">
      </div>
    </div>
  )

}

export default TickerWidget