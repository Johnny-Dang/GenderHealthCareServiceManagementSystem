import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// Version-compatible rendering
try {
  // For React 18+
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  // Fallback for older React versions
  console.warn('Using fallback React rendering mode:', error.message);
  const rootElement = document.getElementById('root');
  if (ReactDOM.render) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      rootElement
    );
  } else {
    // Display error in the DOM if all rendering methods fail
    rootElement.innerHTML =
      '<div style="color:red;padding:20px;">Error initializing React. Please check the console.</div>';
    console.error('Could not initialize React rendering:', error);
  }
}
