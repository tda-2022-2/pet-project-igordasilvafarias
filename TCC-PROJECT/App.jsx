import React from 'react';
import { ThemeProvider } from 'styled-components';
import light from './src/styles/themes/light';
import Routes from './src/routes';
import { UserProvider } from './src/contexts/UserContext';
import { ProductProvider } from './src/contexts/ProductContext';
import { CartContext, CartProvider } from './src/contexts/CartContext';

import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <Routes />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
      <FlashMessage position="top" duration={3000} />
    </ThemeProvider>
  );
}
