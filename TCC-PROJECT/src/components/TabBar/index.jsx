import React from 'react';

import { useNavigation, StackActions } from '@react-navigation/native';

import {
  Container,
  Inside,
  MyOrdersButton,
  IconBasket,
  TitleMyOrders,
  HomeButton,
  IconHome,
} from './styles';

export default function TabBar() {
  const navigation = useNavigation();

  async function handleFindOrders() {
    try {
      navigation.navigate('MyOrders');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Inside>
        <MyOrdersButton
          onPress={() => {
            handleFindOrders();
          }}
        >
          <IconBasket name="shopping-basket" />
          <TitleMyOrders>Meus Pedidos</TitleMyOrders>
        </MyOrdersButton>

        <HomeButton
          onPress={() => navigation.dispatch(
            StackActions.replace('Dashboard')
          )}
        >
          <IconHome name="qrcode" />
        </HomeButton>

        <MyOrdersButton
          onPress={ () => {
            navigation.navigate('MyProfile');
          }}
        >
          <IconBasket name="user" />
          <TitleMyOrders>Meu Perfil</TitleMyOrders>
        </MyOrdersButton>

      </Inside>
    </Container>
  );
}
