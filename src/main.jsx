import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ArweaveWalletKit } from "@arweave-wallet-kit/react";
import ArConnectStrategy from "@arweave-wallet-kit/arconnect-strategy";

createRoot(document.getElementById('root')).render(
     
      <App/>

)
