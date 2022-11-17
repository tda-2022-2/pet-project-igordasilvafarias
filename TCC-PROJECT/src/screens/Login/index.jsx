import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

import {
  Container,
  ButtonsContainer,
} from './styles';

export default function Login() {

  const [loginOptions, setLoginOptions] = useState('signIn') // signIn | signOut

  return (
    <Container>
      <Header />

      <ButtonsContainer>
        <Button
          text="Login"
          isActive={loginOptions === 'signIn'}
          width={50}
          onPress={() => { setLoginOptions('signIn') }}
        />

        <Button
          text="Cadastro"
          width={50}
          isActive={loginOptions === 'signOut'}
          onPress={() => { setLoginOptions('signOut') }}

        />
      </ButtonsContainer>

      {
        loginOptions === 'signIn' && (

          <SignIn />

        )
      }

      {
        loginOptions === 'signOut' && (

          <SignOut setLoginOptions={setLoginOptions} />

        )
      }



    </Container>
  )
}
