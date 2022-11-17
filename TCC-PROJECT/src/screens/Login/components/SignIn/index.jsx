import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { useUser } from '../../../../contexts/UserContext'
import { showMessage } from 'react-native-flash-message';
import { Formik } from "formik";
import * as yup from "yup";
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components';

import {
  FormContainer,
  LoginForm,
  ButtonsWrapper
} from '../../styles';

import Button from '../../../../components/Button';
import Input from '../../../../components/Inputs';
import TextButton from '../../../../components/TextButton';

export default function SignIn() {
  const navigation = useNavigation();
  const theme = useTheme();

  const { loginUser } = useUser();

  const [load, setLoad] = useState(false);

  const initialValues = {
    email: '',
    password: ''
  }

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Deve ser um email válido")
      .required("Preenchimento Obrigatório"),
    password: yup
      .string()
      .required("Preenchimento Obrigatório"),
  });

  async function handleLogin(values) {

    setLoad(true)

    try {

      await loginUser(values.email, values.password);

      showMessage({
        message: "Login realizado com sucesso!",
        type: "success",
      });
      setLoad(false)
      navigation.navigate('Dashboard')

    } catch (err) {
      console.log(err)
      showMessage({
        message: "Email ou senha inválidos",
        type: "danger",
      });
      setLoad(false)
    }
  }

  function handleForgotPassword() {
    navigation.navigate('PasswordRecovery');
  }

  return (

    <Formik
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={values => handleLogin(values)}
    >
      {(props) => (<>
        <FormContainer>
          <LoginForm>

            <Input
              name="email"
              placeholder="E-mail"
              width={100}
              autoCapitalize="none"
              value={props.values.email}
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')}
              error={props.errors.email && props.touched.email ? (props.errors.email) : null}
            />

            <Input
              name="password"
              placeholder="Senha"
              autoCapitalize="none"
              width={100}
              value={props.values.password}
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              secureTextEntry
              error={
                props.errors.password && props.touched.password ? (props.errors.password) : null
              }
            />

          </LoginForm>
          <ButtonsWrapper>
          <TextButton
            text="Esqueci minha senha"
            width={50}
            onPress={handleForgotPassword} />

          {load
            ? <ActivityIndicator color={theme.colors.success} />
            : (
              <Button
                text="Login"
                isActive={true}
                radius
                width={50}
                type="submit"
                onPress={props.handleSubmit}
              />
            )
          }
        </ButtonsWrapper>
        </FormContainer>
        
      </>
      )}
    </Formik>

  )
}
