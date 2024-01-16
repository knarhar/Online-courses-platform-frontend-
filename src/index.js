

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
require('events').EventEmitter.defaultMaxListeners = 15;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

