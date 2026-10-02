import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, useNavigate } from 'react-router-dom';
import App from './App';
import { setGlobalNavigate } from './utils/navigation';
import './index.css';

// ---------------------------------------------------------------------------
// Electron: skip the public landing and boot straight at /login
// ---------------------------------------------------------------------------
const isElectron =
  typeof window !== 'undefined' && !!window.electron?.isElectron;

if (isElectron) {
  const hash = window.location.hash || '';
  // Empty, "#", or "#/" → redirect to /login
  if (hash === '' || hash === '#' || hash === '#/') {
    window.location.hash = '/login';
  }
}

function NavigateBridge() {
  const navigate = useNavigate();
  React.useEffect(() => {
    setGlobalNavigate(navigate);
  }, [navigate]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <NavigateBridge />
      <App />
    </HashRouter>
  </React.StrictMode>
);