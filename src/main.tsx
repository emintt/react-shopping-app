import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/cart.context.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        {/* <CategoriesProvider> */}
          <CartProvider>
            <App />
          </CartProvider>
        {/* </CategoriesProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
