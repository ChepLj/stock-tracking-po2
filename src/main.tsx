import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/loginContext';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { setupIonicReact } from "@ionic/react";
//! Chuyển tất CSS sang nền tảng IOS để thống nhất
setupIonicReact({
  mode: "ios",
});
// Call the element loader before the render call
defineCustomElements(window);
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
     <AuthProvider>
    <App />
  </AuthProvider>
  // </React.StrictMode>
);