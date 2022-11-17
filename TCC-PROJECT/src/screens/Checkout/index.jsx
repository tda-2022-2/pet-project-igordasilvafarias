import React, {useState, useEffect} from 'react';
import { Text, View, Modal } from 'react-native';
import HeaderMenu from '../../components/HeaderMenu';
import MainTitle from '../../components/MainTitle';
import TextButton from '../../components/TextButton';
import CartProduct from '../../components/CartProduct';
import CartTotal from '../../components/CartTotal';
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native';
import Separator from '../../components/Separator';
import Card from '../../components/Card'
import { useCart } from '../../contexts/CartContext'
import { useUser } from '../../contexts/UserContext'

import {
  Container,
  Content,
  Header,
  ContainerProducts,
  ContanerModal,
  ModalContent,
  ModalCardList,
  CardLine,
  CardWrapper
} from './styles';

export default function MyCart() {
  const navigation = useNavigation();

  const [modalcard, setModalCard] = useState(false);
  const [cardList, setCardList] = useState();
  const [chosenCard, setChosenCard] = useState(null);

  const { getUserCards } = useUser([]);
  const { cart, total, handleTotal } = useCart();

  function handleCard() {
    setModalCard(!modalcard)
  }

  async function getCardList() {
    try {

      const cards = await getUserCards();
      setCardList(cards)

    } catch (err) {
      console.log('error');
      console.log(err);
    }
  }

  function handleChosenCard(card) {
    setChosenCard(card)
    handleCard()
  }

  useEffect(() => {
    getCardList()
  }, [])

  console.log('chosenCard: ', chosenCard)

  return (
    <Container>
      <HeaderMenu />
      <Content>
        <Header>
          <MainTitle title="Checkout" />
        </Header>

        <CartTotal text='Valor final' total={total} />
            
        <ContainerProducts>

        <Separator width='10' height='20' />

        {
          chosenCard
          ? (
            <Button
              text='Trocar cartão de crédito'
              onPress={() => handleCard()}
        />
          )
          : (
            <Button
              text='Escolher cartão de crédito'
              isActive
              onPress={() => handleCard()}
            />
          )
        }

        { modalcard 
          && 
          (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalcard}
              onRequestClose={() => {
                setModalCard(!modalcard);
              }}
            >
              <ContanerModal >
                <ModalContent>
                  <MainTitle title='Meus cartões de crédito' />

                  <ModalCardList>

                  {
                    cardList.length > 0
                    ? (
                      cardList.map((card, index) => {
                        const [id, data] = card;
                        return (
                          <TextButton
                          key={index}
                          text={`FINAL ${(data.number).slice(15)}`}
                          onPress={() => handleChosenCard(data)}
                          />
                        )
                      })
                    )
                    : 
                    <>
                      <TextButton
                          text={'Você nãi possui cartão de crédito cadastrado. Cadastrar agora.'}
                          onPress={() => navigation.navigate('MyProfile')} />
                    </>
                  }

                  </ModalCardList>


                  <TextButton
                    text='Fechar'
                    onPress={() => handleCard()}
                  />
                </ModalContent>
              </ContanerModal>
      </Modal>
          )
        }

          <Separator width='10' height='20' />


        {
          chosenCard &&

          <Card>
            <MainTitle
              title="Cartão escolhido"
              size={16} 
            />

            <CardWrapper>
              <CardLine>
                <MainTitle
                  title= {'Nome: '}
                  size={14} />
                <Text>
                  {chosenCard.name}
                </Text>
              </CardLine>

              <CardLine>
                <MainTitle
                  title= {'Numero: '}
                  size={14} />
                <Text>
                  {chosenCard.number}
                </Text>
              </CardLine>
            </CardWrapper>

          </Card>
          
        }

        </ContainerProducts>
        <Separator width='10' height='20' />

        {
          chosenCard &&
          
          <Button
            text='Finalizar pedido'
            isActive
            onPress={() => {}}
          />

          
        }
        
      </Content>
    </Container>
  )
}