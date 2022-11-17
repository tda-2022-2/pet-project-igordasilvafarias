import React, { useContext, createContext, useState } from 'react';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import LZString from '../config/ZLString';

export const ProductContext = createContext({})

export function ProductProvider({ children }) {
  const db = database().ref();

  const [productData, setProductData] = useState();

  async function findProductByCode(productId) {

    if (!productId) {
      throw new Error('productId is required');
    }

    try {

      let snapshot = await db
        .child('/offers/')
        .orderByChild('BarCode')
        .equalTo(`${productId}`)
        .once('value');

      const [product] = Object.entries(snapshot.val())
      const [id, productData] = product;
      
      setProductData(productData)
      return productData.BarCode;

    } catch (err) {
      console.log(err)
      throw new Error('Product not found')
    }

  }

  async function getImage(imageId) {

    if (!imageId) {
      throw new Error('productId is required');
    }

    try{

    const snapshot = await db
      .child('/image/')
      .orderByChild('id')
      .equalTo(`${imageId}`)
      .once('value');
      
      if (!snapshot.exists()) {
        throw new Error('Image not found')
      }

      const imageBase64 = Object.values(snapshot.val())[0].base64;
      const res = await LZString.decompressFromUTF16(imageBase64);
      
      return res;

    } catch (err) {
      throw new Error('Image not found')

    }
  }

  async function checkQuantity(productId){}


  return (
    <ProductContext.Provider value={{
      productData,
      findProductByCode,
      getImage
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext);
}