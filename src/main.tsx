
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global flag to prevent multiple mounts - important for Capacitor integration
let hasAppMounted = false;

const mountApp = () => {
  // Short-circuit if already mounted
  if (hasAppMounted) {
    console.warn("App has already been mounted! Preventing duplicate mounting.");
    return;
  }
  
  console.log("Attempting to mount app...");
  
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found!");
    return;
  }
  
  // Check if there's already content in the root element
  if (rootElement.childElementCount > 0) {
    console.warn("Root element already has children. Clearing to prevent duplicate rendering.");
    rootElement.innerHTML = '';
  }
  
  try {
    const root = createRoot(rootElement);
    
    // Use React StrictMode to catch potential issues
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    hasAppMounted = true;
    console.log("App successfully mounted");
  } catch (error) {
    console.error("Failed to mount app:", error);
  }
};

// More robust DOM ready check
const ensureDomReady = (callback) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    // Already loaded, but still use setTimeout to ensure we're outside any current JS execution context
    setTimeout(callback, 0);
  }
};

// Use our more robust DOM ready checker
ensureDomReady(mountApp);
