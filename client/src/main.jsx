import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import appStore from './store/appStore.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { ThemeProvider } from './components/themeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={appStore}>
        <App />
        <Toaster/>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
