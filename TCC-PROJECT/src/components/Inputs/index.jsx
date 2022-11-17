import React from 'react';

import { Container, Text, ErrorMessage } from './styles';

import { useTheme } from 'styled-components';

export default function Input({ 
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
    <>  
      <Container width={width}>
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
      {error ? (<ErrorMessage>{error}</ErrorMessage>) : null}
    </>
  )
}