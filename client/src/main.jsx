import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import appStore from './store/appStore.jsx';
import { Toaster } from './components/ui/sonner.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <App />
        <Toaster/>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
