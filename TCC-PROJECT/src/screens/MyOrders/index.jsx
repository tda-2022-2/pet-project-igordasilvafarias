import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import TabBar from '../../components/TabBar';
import MainTitle from '../../components/MainTitle';
import TextButton from '../../components/TextButton';
import HeaderMenu from '../../components/HeaderMenu';
import {
  Container,
  Content,
  Header,
  HistoryCard,
  HeardCard,
  FooterCard,
  ProductColumn,
} from './styles';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core'
import Separator from '../../components/Separator';
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components';
import HistoryOrders from './components';
import { useUser } from '../../contexts/UserContext';

export default function MyOrders() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(false);

  const { findOrdersByUser } = useUser();

  async function handleFindOrdersByUser() {
    setLoad(true)
    try {
      const order = await findOrdersByUser();
      setOrders(order);
      setLoad(false)

    } catch (error) {
      console.log(error);
      setLoad(false)

    }
  }

  useEffect(() => {
      handleFindOrdersByUser();
    
  }, []);

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
          <MainTitle title="Histórico de Pedidos" />
        </Header>

        {load
          ? (
            <ActivityIndicator color={theme.colors.success} />
          ) :
          (
            orders.length > 0
              ? (
                orders.map((order, index) => {
                  return (
                    <HistoryCard>
                      <HeardCard>
                        <ProductColumn width={40}>
                          <MainTitle title="Pedido: " size={16} />
                          <Text>{index + 1}</Text>
                        </ProductColumn>
                        <ProductColumn width={40}>
                          <MainTitle title="Status: " size={16} />
                          <Text>{order[1].status}</Text>
                        </ProductColumn>
                      </HeardCard>

                      <HistoryOrders
                        items={order}
                      />

                      <FooterCard>
                        <MainTitle title="Total: " size={16} />
                        <Text>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order[1].total)}</Text>
                      </FooterCard>

                    </HistoryCard>

                  )

                })
              ) : (
                <TextButton
                  text='Você não realizou nenhum pedido'
                />
              )
          )}



        <Separator width='10' height='100' />

      </Content>
      <TabBar />
    </Container>
  )
}