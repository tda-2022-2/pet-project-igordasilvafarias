import React from 'react';
import Button from '../../../../components/Button';

import { Container, Header, ContainerButton, Card, Title, TextDetails } from './styles';

export default function DeleteMessage(props) {
  return (
    <Container>
      <Card>
        <Title>
          Tem certeza que deseja deletar este {props.cardType}?
        </Title>
        <TextDetails>
          {props.cardDetails}
        </TextDetails>
        <ContainerButton>
          <Button
            text='Sim'
            isActive='grey'
            width={40} 
            onPress={async(e) => {
              props.deleteItem()
              props.closeConfirmMessage()
            }}
          />
          <Button
            text='Não'
            isActive
            width={40} 
            style={{  backgroundColor:'#4a4a4a' }}
            onPress={async(e) => {
              props.closeConfirmMessage()
            }}
          />
        </ContainerButton>
      </Card>
    </Container>
  )
}