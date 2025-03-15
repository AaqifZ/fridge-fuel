
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// To prevent any chance of double mounting, use a more reliable approach
let hasRendered = false;

const renderApp = () => {
  if (hasRendered) {
    console.warn("App has already been rendered! Preventing duplicate rendering.");
    return;
  }

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found!");
    return;
  }

  // Clear any existing content to ensure clean mounting
  rootElement.innerHTML = '';
  
  const root = createRoot(rootElement);
  
  // Wrap the App component in a div with a key to force React to treat it as a unique component
  root.render(
    <div key="app-wrapper">
      <App />
    </div>
  );
  
  console.log("App mounted successfully");
  hasRendered = true;
};

// Execute rendering after a small delay to ensure DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // Already loaded, render immediately
  renderApp();
}
