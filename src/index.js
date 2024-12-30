import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css"
import { BrowserRouter } from 'react-router-dom';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <App /> 
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
