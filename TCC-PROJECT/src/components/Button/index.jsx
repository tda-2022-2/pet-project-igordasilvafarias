import React from 'react';
import {  } from 'react-native';
import { ButtonContainer, Text } from './styles';

export default function Button({ 
  isActive,
  text,
  width,
  loading, 
  radius, 
  ...rest }) {

  return (
    <ButtonContainer isActive={isActive} width={width} radius={radius} {...rest}>
      <Text isActive={isActive}>{text}</Text>
    </ButtonContainer>
  )
}

