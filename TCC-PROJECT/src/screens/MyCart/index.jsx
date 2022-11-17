import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import HeaderMenu from '../../components/HeaderMenu';
import MainTitle from '../../components/MainTitle';
import TextButton from '../../components/TextButton';
import CartProduct from '../../components/CartProduct';
import CartTotal from '../../components/CartTotal';
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native';

import { useCart } from '../../contexts/CartContext'

import {
  Container,
  Content,
  Header,
  ContainerProducts
} from './styles';
import Separator from '../../components/Separator';

export default function Checkout() {
  const navigation = useNavigation();

  const { cart, total, handleTotal } = useCart()

  useEffect(() => {
    handleTotal()
  }, [cart])

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
        <Header>
          <MainTitle title="Meu carrinho" />
        </Header>

        <ContainerProducts>

          

          { cart.length > 0 && 
          (
            cart.map((item, index) => {
              return (
                <CartProduct key={index} product={item} />
              )
            })
          )}

          { cart.length > 0 ? (
            <>
              <CartTotal total={total} />
            
              <Button
                text='Finalizar pedido'
                isActive
                onPress={
                  () => navigation.navigate('Checkout')
                }
              />
              <Separator width='10' height='100' />
            </> ) : (
              <>
                <TextButton
                  text='Seu carrinho está vazio, voltar para a tela de busca'
                  onPress= {
                    () => navigation.dispatch(
                      StackActions.replace('Dashboard')
                    )
                  }
                />
              </>
            )

          }


        </ContainerProducts>

        {/* <TextButton
          text='Você não realizou nenhum pedido'
        /> */}


      </Content>
    </Container>
  )
}