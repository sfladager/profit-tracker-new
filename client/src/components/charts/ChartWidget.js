// TradingViewWidget.js

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget({ trade }) {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_6d56b') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol:  trade.symbol,
            interval: trade.timeframe,
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_6d56b"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-chart-container'>
      <div id='tradingview_6d56b' />
      {/* <div className="tradingview-widget-copyright">
        <a href={`https://www.tradingview.com/symbols/${trade.symbol}/`} rel="noopener" target="_blank"><span className="blue-text">{trade.symbol} stock chart</span></a> by TradingView
      </div> */}
    </div>
  );
}


// import { TradingView } from 'https://s3.tradingview.com/tv.js'

// import { useEffect } from 'react'

// const ChartWidget = ({ trade }) => {

//   useEffect(() => {
//     new TradingView.widget(
//       {
//         'autosize': true,
//         'symbol': trade.symbol,
//         'interval': trade.timeframe,
//         'timezone': 'Etc/UTC',
//         'theme': 'light',
//         'style': '1',
//         'locale': 'en',
//         'toolbar_bg': '#f1f3f6',
//         'enable_publishing': false,
//         'allow_symbol_change': true,
//         'container_id': 'tradingview_38969',
//       }
//     )
//   }, [trade])

//   return (
//     <div className="tradingview-chart-container">
//       <div id="tradingview_38969">
//       </div>
//     </div>
//   )
// }

// export default ChartWidget