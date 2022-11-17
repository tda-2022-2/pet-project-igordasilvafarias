import React, { useContext, createContext, useState } from 'react';

export const CartContext = createContext({})


export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0)


  function addToCart(item) {

    const alreadyExists = cart.find(product => product.productData.BarCode === item.productData.BarCode)
    
    if(alreadyExists != undefined) {
      const filteredItems = cart.filter(product => product.productData.BarCode !== item.productData.BarCode);
     
      const totalQuantity = item.productData.quantity;
      const itemQuantity = item.quantity + alreadyExists.quantity;

      if (totalQuantity < itemQuantity) {
        item.quantity = totalQuantity;
        setCart([...filteredItems, item])
        return
      }

      item.quantity = itemQuantity;
      setCart([...filteredItems, item])
      return
    }

    setCart([...cart, item])
  }

  function removeToCart(barCodeItem) {

    const filteredItems = cart.filter(product => product.productData.BarCode !== barCodeItem);
    setCart(filteredItems)

  }

  function handleQuantity(barCode, newQuantity) {

    let products = cart

    let index = products.findIndex(prod => prod.productData.BarCode === barCode)
    products[index].quantity = newQuantity
    setCart(products)
    handleTotal()
    return products[index].quantity
  }

  function handleTotal() {
    let totalValue = 0;
    cart.forEach(product => {
      const value = product.productData.price;
      const quantity = product.quantity;

      totalValue += value * quantity
    })
    setTotal(totalValue);
  }

  return (
    <CartContext.Provider value={{
      cart,
      total,
      addToCart,
      removeToCart,
      handleQuantity,
      handleTotal
    }}>
      {children}
    </CartContext.Provider>
  )

}

export const useCart = () => {
  return useContext(CartContext);
}
