import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css"
import { BrowserRouter } from 'react-router-dom';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import Modal from 'react-modal'


const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement('#root');
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
