import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/base.css'
import './styles/gallery.css'
import './styles/cards.css'
import './styles/header.css'
import './styles/search.css'
import './styles/meta.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
