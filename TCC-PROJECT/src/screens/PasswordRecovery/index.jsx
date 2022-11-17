import React, {useState} from 'react';
import {
  Container,
  FormContainer,
  LoginForm,
  TitleWrapper,
  Title,
  Subtitle
} from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Inputs';
import Separator from '../../components/Separator';
import TextButton from '../../components/TextButton';
import { useNavigation } from '@react-navigation/core';
import * as yup from "yup";
import { Formik } from 'formik';
import { useTheme } from 'styled-components';

import { useUser } from '../../contexts/UserContext';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from 'react-native'


export default function PasswordRecovery() {

  const { forgotPassword } = useUser();
  const navigation = useNavigation();
  const theme = useTheme();

  const [load, setLoad] = useState(false);

  const initialValues = {
    email: ''
  }

  const passwordRecoveryValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Deve ser um email válido")
      .required("Preenchimento Obrigatório")
  });


  async function handlePasswordRecovery(email) {

    setLoad(true)

    try {

      await forgotPassword(email);

      showMessage({
        message: "Email enviado para o usuário!",
        type: "success",
      });

      setLoad(false)
      navigation.navigate('Login')

    } catch (err) {
      console.log(err)
      showMessage({
        message: "Email inválidos",
        type: "danger",
      });
      setLoad(false)

    }
  }

  return (
    <Container>
      <Header />

      <FormContainer>

        <TitleWrapper>
          <Title>Redefinir senha</Title>
          <Subtitle>Informe seu e-mail associado com sua conta cadastrada
            e enviaremos um e-mail para a recuperação de sua senha.
          </Subtitle>
        </TitleWrapper>

        <Formik
          validationSchema={passwordRecoveryValidationSchema}
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {(props) => (
            <LoginForm>

              <Input 
                name="email"
                placeholder="E-mail" 
                width={100}
                value={props.values.email} 
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                error={props.errors.email && props.touched.email ? (props.errors.email) : null}
              />

              <Separator width={'100'} height={'30'}/>

              {
                load
                ? <ActivityIndicator color={theme.colors.success} />
                : (
                  <Button 
                    text="Enviar" 
                    isActive={true} 
                    radius 
                    width={50}
                    onPress={(e) => {
                        e.preventDefault();
                        props.validateForm().then((result) => {
                          if (Object.keys(result).length === 0) {
                            handlePasswordRecovery(props.values.email);
                          } else {
                          }
                        })
                        props.handleSubmit
                        console.log(props.values)
                      }
                    } 
                  />
                )
              }

              <TextButton
                text={'Voltar para a tela de login'}
                onPress={() => { navigation.goBack()}}
                />

            </LoginForm>
          )}
        </Formik>

      </FormContainer>
    </Container>
  )
}
