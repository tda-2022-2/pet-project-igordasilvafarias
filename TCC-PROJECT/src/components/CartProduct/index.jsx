import React, {useState} from 'react';
import Button from '../Button';
import {
  CardProduct,
  Container,
  ColumnView,
  RowView,
  ProductImage,
  ProductTitle,
  ProductText,
  QuantityButtonWrapper,
  QuantityText
} from './styles';

import { useCart } from '../../contexts/CartContext'

export default function CartProduct({ product }) {

  const { removeToCart, handleQuantity } = useCart()

  let {productData, productImage, quantity} = product;
  const [quantityValue, setQuantityValue] = useState(quantity)

  function handleLessQuantity() {

    let newQuantity = quantity - 1

    if (newQuantity > 0) {
      const newValue = handleQuantity(productData.BarCode, newQuantity)
      setQuantityValue(newValue)
    }
  }

  function handlePlusQuantity() {

    let newQuantity = quantity + 1

    if (newQuantity <= productData.quantity) {
      const newValue = handleQuantity(productData.BarCode, newQuantity)
      setQuantityValue(newValue)
    }
  }

  return (
    <CardProduct>
      <Container>

        <ColumnView width="30">
          <ProductImage source={{
              uri: productImage
            }}  />
        </ColumnView>

        <ColumnView width="70">
          <RowView>
            <ProductTitle>{productData.title}</ProductTitle>
          </RowView>

          <RowView>
            <ColumnView width="32">
              <ProductText title>Valor</ProductText>
              <ProductText >
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(productData.price)}
              </ProductText>
            </ColumnView>
            
            <ColumnView width="26">
              <ProductText title>Desconto</ProductText>
              <ProductText >-</ProductText>
            </ColumnView>

            <ColumnView width="38">
              <ProductText title>Valor Final</ProductText>
              <ProductText >
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(productData.price * quantity)}
              </ProductText>
            </ColumnView>
            
          </RowView>

          <RowView>

            <ColumnView width="50">
            <Button
              text='REMOVER'
              onPress={() => removeToCart(productData.BarCode)}
            />
              
            </ColumnView>
            
            <ColumnView width="40">
            <QuantityButtonWrapper>
                <Button
                  text='-'
                  isActive
                  width={35}
                  onPress={() => handleLessQuantity()}
                  disabled={quantity <= 1}

                />
                <QuantityText>{quantityValue}</QuantityText>
                <Button 
                  text='+'
                  isActive
                  width={35}
                  onPress={() => handlePlusQuantity()}
                  disabled={quantity >= productData.quantity}

                />
              </QuantityButtonWrapper>
            </ColumnView>

          </RowView>
          
        </ColumnView>

        
      </Container>
    </CardProduct>
  )
}