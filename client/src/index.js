import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles/main.scss'
// import 'https://s3.tradingview.com/tv.js'

import App from './App'

createRoot(document.getElementById('root')).render(<App />)