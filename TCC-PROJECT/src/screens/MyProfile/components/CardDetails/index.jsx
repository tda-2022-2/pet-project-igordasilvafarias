import React, { useState } from 'react';
import { TouchableOpacity, Modal } from 'react-native';

import DeleteMessage from '../DeleteMessage';
import { useUser } from '../../../../contexts/UserContext'

import {
  Container,
  Title,
  IconX
} from './styles'

export default function CardDetails({size, title, itemId, setLoad}) {
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
      await removeDataList('cards', itemId)
      setLoad(true)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Title size={size}>
        {title}
      </Title>
      <TouchableOpacity
        onPress={() => {
          handleConfirmMessageModalOpen()
          // handleRemove()
        }}
      >
        <IconX name="times"/>
      </TouchableOpacity>

      <Modal visible={confirmMessageModalOpen}>
        <DeleteMessage
          cardType='cartão'
          cardDetails={title} 
          closeConfirmMessage={handleConfirmMessageModalClose}
          deleteItem={handleRemove}
        />
      </Modal>
    </Container>
  )
}