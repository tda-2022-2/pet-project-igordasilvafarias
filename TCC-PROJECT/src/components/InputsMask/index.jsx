import React from 'react';

import { Container, Text, ErrorMessage, ContainerError, ContainerMain } from './styles';

import { useTheme } from 'styled-components';

export default function InputsMusk({ 
  text,
  placeholder,
  onChangeText,
  name,
  value,
  width,
  error,
  type,
  ...rest }) {

  const theme = useTheme()

    return (
    <ContainerMain width={width}>  
      <Container>
        <Text
          placeholderTextColor={theme.colors.grey}
          placeholder={placeholder} 
          value={value} 
          onChangeText={onChangeText}
          name={name}
          type={type}
          {...rest}
        >
          {text}
        </Text>
      </Container>
      <ContainerError>
        {error ? (<ErrorMessage>{error}</ErrorMessage>) : null}
      </ContainerError>
    </ContainerMain>
  )
}