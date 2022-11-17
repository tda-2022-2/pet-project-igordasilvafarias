import React from 'react';

import MainTitle from '../../components/MainTitle';

import Button from '../../components/Button';

import { states } from '../MyAddress/util/states'

import {
  Container,
  Header, 
  Content,
  ContainerButton,
  State,
  Name,
  Footer
} from './styles';

import { FlatList } from 'react-native';

export default function StateSelect(props) {
  function handleStateSelect(item) {
    props.setState(item);
  }

  return (
    <Container>
      <Content>
        <Header>
          <MainTitle title="Selecione o Estado" />
        </Header>
          
          <FlatList 
            data={states}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => (
              <State
                onPress={() => handleStateSelect(item)}
                isActive={props.state.key === item.key}
              >
                <Name>{item.name}</Name>
              </State>
            )}
          />

        <Footer>
          <ContainerButton>
            <Button
              text='Selecionar'
              isActive
              width={30} 
              radius
              onPress={props.closeStateSelect}
            />
          </ContainerButton>
        </Footer>

     </Content>
    </Container>
  )
}