import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css"
import Modal from 'react-modal'


const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement('#root');
root.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
);
