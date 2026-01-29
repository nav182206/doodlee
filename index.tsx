
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("App initializing...");

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App rendered successfully.");
  } catch (error) {
    console.error("Failed to render the app:", error);
    container.innerHTML = `<div style="padding: 20px; color: red;">Something went wrong while loading the surprise. Please check the console.</div>`;
  }
} else {
  console.error("Root element not found");
}
