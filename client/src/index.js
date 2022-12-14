import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'
import 'https://s3.tradingview.com/tv.js'
import 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'

import App from './App'

createRoot(document.getElementById('root')).render(<App />)