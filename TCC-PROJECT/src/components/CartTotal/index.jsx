import React from 'react';
import {
  CardProduct,
  Container,
  ColumnView,
  RowView,
  ProductTotal,
  ProductTitle,
} from './styles';

export default function CartTotal({ total, text }) {
  return (
    <CardProduct>
      <Container>
           
        <ColumnView width="60">
          <RowView>
            <ProductTitle>{text ? `${text}:` : `Total:`}</ProductTitle>
          </RowView>
        </ColumnView>

        <ColumnView width="40">
          <RowView>
            <ProductTotal>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
            </ProductTotal>
          </RowView>
        </ColumnView>

      </Container>
    </CardProduct>
  )
}