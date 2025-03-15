
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure the app is only mounted once
const mountApp = () => {
  console.log("Attempting to mount app...");
  
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found!");
    return;
  }
  
  // Create the React root once
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("App successfully mounted");
  } catch (error) {
    console.error("Failed to mount app:", error);
  }
};

// Execute only once when the DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    mountApp();
  });
} else {
  mountApp();
}
