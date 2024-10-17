import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import NiiVue from './Niivue.jsx'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

const Main = () => {
  const [volumes, setVolumes] = useState([])

  return (
    <React.StrictMode>
      <App setVolumes={setVolumes} />
      <NiiVue volumes={volumes} />
    </React.StrictMode>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)