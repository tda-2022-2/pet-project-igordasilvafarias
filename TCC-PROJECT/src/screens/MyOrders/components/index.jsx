import React, { useEffect, useState } from 'react';

import {
  ProductListContainer,
  Product,
  ProductColumn,
  ProductText
} from './styles';

import { Text } from 'react-native';

export default function HistoryOrders(props) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    //console.log('ITEMS', props.items)
    if (props.items) {
      setOrders(props.items);
    }
    console.log('ORDERS', orders);
  })

  return (
    <>
      {orders
        ?
        <ProductListContainer>
          {orders[1].items.map((item) => {
            return(
              <Product>
                <ProductColumn width={65}>
                  <ProductText>{item.title}</ProductText>
                </ProductColumn>

                <ProductColumn width={35}>
                  <ProductColumn width={40}>
                    <ProductText>1x</ProductText>
                  </ProductColumn>

                  <ProductColumn width={60}>
                    <ProductText>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</ProductText>
                  </ProductColumn>

                </ProductColumn>
              </Product>
            )
          })}
        </ProductListContainer>
        :
        <Text></Text>
      }
    </>
  );
}