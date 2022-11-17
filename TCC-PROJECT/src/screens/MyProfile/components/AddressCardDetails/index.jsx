import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity, Modal } from 'react-native';
import { useUser } from '../../../../contexts/UserContext'
import {
  Container,
  NameContainer,
  AddressContainer,
  TitleAddress,
  IconsCard
} from './styles'
import DeleteMessage from '../DeleteMessage';
import MainTitle from '../../../../components/MainTitle';
import { showMessage } from 'react-native-flash-message';

export default function AddressCardDetails({address, titleName, size, titleAddress, itemId, setLoad}) {
  const navigation = useNavigation();

  const [confirmMessageModalOpen, setConfirmMessageModalOpen] = useState(false);

  function handleConfirmMessageModalOpen() {
    setConfirmMessageModalOpen(true);
  }

  function handleConfirmMessageModalClose() {
    setConfirmMessageModalOpen(false);
  }
  const { removeDataList } = useUser();

  async function handleRemove() {
    try {
      await removeDataList('addreses', itemId)
      setLoad(true)

    } catch (err) {
      console.log(err)
    }
  }

  let title = undefined;
  let concatAddress = undefined;

  if (address) {
    address.lastname ? address.lastname : address.lastname = '';
    address.street ? address.street : address.street = '';
    address.number ? address.number : address.number = '';
    address.bairro ? address.bairro : address.bairro = '';
    address.state ? address.state : address.state = '';
    address.name ? address.name : address.name = '';
    address.comp ? address.comp : address.comp = '';
    address.city ? address.city : address.city = '';
    address.cep ? address.cep : address.cep = '';
    address.uf ? address.uf : address.uf = '';
    title = `${address.name} ${address.lastname}`;
    concatAddress = `${address.street}, ${address.number} ${address.comp} - ${address.bairro}\n${address.city}, ${address.uf}\n${address.cep}`
  }

  return (
    <Container>
      <NameContainer>
        <MainTitle 
          title={address ? title : titleName} size={18} 
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyAddress', {isEditable: true, itemId, address})
          }}
        >
          <IconsCard name="edit" />
        </TouchableOpacity>
      </NameContainer>
      <AddressContainer>
        <TitleAddress size={size}>
          {address ? concatAddress : titleAddress}
        </TitleAddress>
        <TouchableOpacity
          onPress={() => {
            handleConfirmMessageModalOpen()
            
            // handleRemove()
          }}
        >
          <IconsCard name="times"/>
        </TouchableOpacity>
      </AddressContainer>

      <Modal visible={confirmMessageModalOpen}>
        <DeleteMessage
          cardType='endereço'
          cardDetails={concatAddress} 
          closeConfirmMessage={handleConfirmMessageModalClose}
          deleteItem={handleRemove}
        />
      </Modal>
    </Container>
  );
}