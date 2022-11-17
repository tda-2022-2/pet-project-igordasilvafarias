import React from 'react';
import {  } from 'react-native';
import { ButtonContainer, Text } from './styles';

export default function TextButton({ 
  isActive,
  text,
  width,
  loading, 
  ...rest }) {

  return (
    <ButtonContainer isActive={isActive} width={width} {...rest}>
      <Text isActive={isActive}>{text}</Text>
    </ButtonContainer>
  )
}

