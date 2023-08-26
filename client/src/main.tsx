import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { StyledEngineProvider } from '@mui/joy/styles';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <Provider store={store}>
    <App />
    </Provider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
