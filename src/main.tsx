
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element
const rootElement = document.getElementById("root");

// Ensure we only mount the app if the element exists and hasn't been mounted yet
if (rootElement) {
  // Check if the element already has content (might indicate double mounting)
  if (rootElement.childElementCount === 0) {
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("App mounted successfully");
  } else {
    console.warn("Root element already has content! Preventing double mounting.");
  }
} else {
  console.error("Root element not found!");
}
