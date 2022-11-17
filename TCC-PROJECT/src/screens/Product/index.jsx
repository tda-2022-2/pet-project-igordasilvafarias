import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import HeaderMenu from '../../components/HeaderMenu';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Separator from '../../components/Separator';
import { useProduct } from '../../contexts/ProductContext'
import { useCart } from '../../contexts/CartContext'
import { showMessage } from 'react-native-flash-message';

import { useNavigation } from '@react-navigation/core'
import { FontAwesome } from '@expo/vector-icons'; 
import { StackActions } from '@react-navigation/native';

import {
  Container,
  Content,
  ProductImage,
  ColumnView,
  RowView,
  ProductText,
  QuantityButtonWrapper,
  QuantityText
} from './styles';

export default function Product() {
  const navigation = useNavigation();

  const { productData, getImage } = useProduct();
  const { addToCart, cart } = useCart()

  const [productImage, setProductImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  function handlePlusQuantity() {

    if ((productData.quantity) > quantity) {
      return setQuantity(quantity + 1)
    }
  }

  function handleLessQuantity() {
    if (quantity <= 1) {
      return
    }

    setQuantity(quantity - 1)
  }

  async function getProductImage() {
    try {
      const image = await getImage(productData.detailImage);
      setProductImage(image)
    } catch(e) {
      setProductImage(null)
    }
  }

  function getFinalValue() {
    return productData.price * quantity
  }

  function handleAddToCart() {
    addToCart({
      productData,
      quantity,
      productImage
    })

    navigation.dispatch(
      StackActions.replace('Dashboard')
    );

    showMessage({
      message: "Produto adicionado no carrinho!",
      type: "success",
    });
  }

  useEffect(() => {
    setPrice(productData.price)
    getProductImage()
  }, [])

  return (
    <Container>
      <HeaderMenu 
        returnFunction={
          () => navigation.dispatch(
            StackActions.replace('Dashboard')
          )
        }
      />
      <Content>
        <Separator width={'100'} height={'25'} />
        <Card>
          <ColumnView width="100">
            { productImage 
              ? <ProductImage source={{
                uri: productImage
                }} />
              : <FontAwesome name="image" size={100} color="grey" />
              
            }
          </ColumnView>
        </Card>

        <Separator width={'100'} height={'10'} />

        <Card>
          <Text>{productData.description}</Text>
        </Card>

        <Separator width={'100'} height={'10'} />

        <Card>
          <RowView width="100">
            <ColumnView height="50" width="32">
              <ProductText title>Valor</ProductText>
              <ProductText>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
              </ProductText>
            </ColumnView>

            <ColumnView height="50" width="26">
              <ProductText title>Desconto</ProductText>
              <ProductText >-</ProductText>
            </ColumnView>

            <ColumnView height="50" width="38">
              <ProductText title>Valor Final</ProductText>
              <ProductText >
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getFinalValue())}
              </ProductText>
            </ColumnView>
          </RowView>

          <RowView>

            <ColumnView height="50" width="50">
              <Button
                text='VOLTAR'
                onPress={() => navigation.dispatch(
                  StackActions.replace('Dashboard')
                )}
              />

            </ColumnView>

            <ColumnView height="50" width="40">
              <QuantityButtonWrapper>
                <Button
                  text='-'
                  isActive
                  width={35}
                  onPress={() => handleLessQuantity()}
                  disabled={quantity <= 1}
                />
                <QuantityText >{quantity}</QuantityText>
                <Button
                  text='+'
                  isActive
                  width={35}
                  onPress={() => handlePlusQuantity()}
                />
              </QuantityButtonWrapper>
            </ColumnView>

          </RowView>

        </Card>

        <Separator width={'100'} height={'10'} />

        <Button
          text='Adicionar ao carrinho'
          isActive
          onPress={() => handleAddToCart()}
        />
        <Separator width={'100'} height={'50'} />

      </Content>
    </Container>
  )
}

