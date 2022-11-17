import React, { useState, useEffect } from 'react';
import {
  CardInputs,
  Container,
  Header,
  Content,
  ContainerInputs,
  ContainerButton,
  TextNotFoundCard,
  Footer,
  LoadContainer
} from './styles';
import { useNavigation } from '@react-navigation/core'
import Input from '../../components/Inputs';
import TabBar from '../../components/TabBar';
import Button from '../../components/Button';
import CardDetails from './components/CardDetails'
import MainTitle from '../../components/MainTitle';
import InputsMask from '../../components/InputsMask';
import TextButton from '../../components/TextButton';
import HeaderMenu from '../../components/HeaderMenu';
import AddressCardDetails from './components/AddressCardDetails';
import { useUser } from '../../contexts/UserContext'
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components';
import { StackActions } from '@react-navigation/native';


export default function MyProfile() {
  const theme = useTheme();

  const { userData, setUserData, findUserByEmail, removeDataList, userSignOut } = useUser();
  const db = database().ref();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cartao, setCartao] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [load, setLoad] = useState(false);
  const [userDataLoad, setUserDataLoad] = useState(false);
  const navigation = useNavigation();

  async function handleLogout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        showMessage({
          message: "Deslogado com sucesso!",
          type: "success",
         });
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function getUserData() {
    setLoad(true)
    try {
      const user = await firebase.auth().currentUser;
      let filteredUser = await findUserByEmail(user.email)      
        
        setEmail(filteredUser.email);

        const [name, lastname] = (filteredUser.name).split(' ')
        setName(name)
        setLastName(lastname)
        
        setPhone(filteredUser.phoneNumber)
        setCpf(filteredUser.cpf)

        if(filteredUser.cards) {
          setCartao(Object.entries(filteredUser.cards))
        } else {
          setCartao([])
        }

        if(filteredUser.addreses) {
          setAddresses(Object.entries(filteredUser.addreses))
        } else {
          setAddresses([])
        }

      setLoad(false)

    } catch (err) {
      console.log(err);
      setLoad(false)

    }
  }

  async function saveUserData() {
    setUserDataLoad(true)
    try {

      database().ref(`/users/${userData.id}`)
      .update({
        name: `${name} ${lastName}`,
        email,
        phoneNumber
        
      }).then(() => console.log('Data set.'));

      setUserDataLoad(false)

      showMessage({
        message: "Dados atualizados com sucesso.",
        type: "success",
      });

    } catch(err) {
      console.log(err)
      setUserDataLoad(false);
      showMessage({
        message: "Erro ao atualizar os dados.",
        type: "danger",
      });
    }
  }

  useEffect(() => {
    getUserData()
  },[])

  return (
    <Container>
      <HeaderMenu 
        returnFunction={
          () => navigation.dispatch(
            StackActions.replace('Dashboard')
          )
        } />
      <Content>
        <Header>
          <MainTitle title="Meu Perfil" size={22} />
        </Header>

        <ContainerInputs>
          <CardInputs>
            <MainTitle
              title={"Meus Dados Pessoais"} size={18}
            />

            { load
              ? <LoadContainer size={300}>
                  <ActivityIndicator color={theme.colors.success} />
                </LoadContainer> 
              : (
                <>
                <Input
                  placeholder='email'
                  value={email}
                  editable={false} 
                  selectTextOnFocus={false}
                />
                <Input
                  placeholder='Nome'
                  value={name}
                  onChangeText={value => setName(value)}
                />
                <Input
                  placeholder='Sobrenome'
                  value={lastName}
                  onChangeText={value => setLastName(value)}
                />
                <InputsMask 
                  placeholder='Telefone'
                  value={phoneNumber}
                  onChangeText={value => setPhone(value)}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                />
                <InputsMask 
                  placeholder='CPF'
                  value={cpf}
                  editable={false} 
                  selectTextOnFocus={false}
                  type={'cpf'}
                />

                <ContainerButton>
                  { userDataLoad
                    ? <ActivityIndicator color={theme.colors.success} />
                    : (
                      <Button
                        text='Salvar'
                        isActive
                        width={30}
                        radius
                        onPress={() => saveUserData()}
                      />

                    )
                  }
                </ContainerButton>
                </>
              )
            }


          </CardInputs>
        </ContainerInputs>

        <ContainerInputs>
          <CardInputs>
            <MainTitle
              title={"Cartao de Credito"} size={18}
            />

            { load
              ? (
                <LoadContainer size={100}>
                  <ActivityIndicator color={theme.colors.success} />
                </LoadContainer> 
              )
              : (
                
                cartao.length <= 0 ?
                  <TextNotFoundCard>
                    Nenhum cartao cadastrado
                  </TextNotFoundCard> : 
                  cartao.map( (card, index) => {
                    return (
                      <CardDetails 
                        key={index} 
                        itemId={card[0]}
                        title={`${card[1].holderName} - FINAL ${(card[1].number).slice(15)}`} 
                        size={15}
                        setLoad={() => setLoad()} />
                    )
                  })  
              )
            }


            <TextButton
              text='Adicionar Novo Cartao'
              onPress={() => navigation.navigate('MyCard')}
            />
          </CardInputs>
        </ContainerInputs>

        <ContainerInputs>
          <CardInputs>
            <MainTitle
              title={"Endereços"} size={18}
            />

            { load
              ? (
                <LoadContainer size={100}>
                  <ActivityIndicator color={theme.colors.success} />
                </LoadContainer> 
              )
              :
              addresses.length <= 0 ? 
              <TextNotFoundCard>
                Nenhum Endereço cadastrado
              </TextNotFoundCard> :
              addresses.map((address, index) => {
                return (
                  <AddressCardDetails
                    key={index}
                    itemId={address[0]}
                    address={address[1]}
                    titleName={'name'}
                    titleAddress={'address'}
                    setLoad={() => setLoad()}
                  />

                )
              })
            }

            <TextButton
              text='Adicionar Novo Endereço'
              onPress={() => navigation.navigate('MyAddress', {isEditable: false})}
            />
          </CardInputs>
        </ContainerInputs>

        <Footer>
          <TextButton
            text='Sair'
            onPress={() => handleLogout()}
          />
          <TextButton />
        </Footer>

      </Content>

      <TabBar />

    </Container>
  )
}