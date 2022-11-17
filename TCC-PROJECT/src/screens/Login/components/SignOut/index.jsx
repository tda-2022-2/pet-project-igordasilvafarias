import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import Button from '../../../../components/Button';
import Input from '../../../../components/Inputs';
import Separator from '../../../../components/Separator';
import {
  FormContainer,
  LoginForm,
} from '../../styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useUser } from '../../../../contexts/UserContext'
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import InputsMusk from '../../../../components/InputsMask';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components';

export default function SignOut({setLoginOptions}) {

   const navigation = useNavigation();
   const theme = useTheme();
   const [load, setLoad] = useState(false);

  const [initialValues, setInitialValues] = useState({
    email: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    cpf: '',
    password: '',
    confirmPassword: ''
  })

  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Deve ser um email válido")
      .required("Preenchimento Obrigatório"),
    name: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    lastName: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    phoneNumber: yup
      .string()
      .min(11, "Deve ser um número de telefone válido")
      .required("Preenchimento Obrigatório"),
    cpf: yup
      .string()
      .min(11, "Deve ser um CPF válido")
      .required("Preenchimento Obrigatório"),
    password: yup
      .string()
      .min(6, "Senha muito curta!")
      .required("Preenchimento Obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], "As senhas precisam ser iguais!")
      .required("Confirme sua senha!")
  });

  const { userData, setUserData } = useUser();

  async function createUserAuth(values) {
    setInitialValues(values);


    try {
      const response = await auth()
        .createUserWithEmailAndPassword(values.email, values.password);

        setUserData({
          ...userData,
          email: response.user.email,
          id: response.user.uid
        })

    return response.user.uid;

    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

  async function createUser(values) {

    setLoad(true);

    try {

      const id = await createUserAuth(values)

      await database().ref(`/users/${id}`)
      .set({
        id: id,
        email: values.email,
        name: `${values.name} ${values.lastName}`,
        phoneNumber: values.phoneNumber,
        cpf: values.cpf,
        password: values.password,
        provider: 'email/senha',
        deviceToken: '',
      })
      setLoad(false)
      showMessage({
        message: "Cadastro realizado com sucesso!",
        type: "success",
      });
      
      setLoginOptions('signIn')
    } catch (err) {
      console.log(err)
      showMessage({
        message: "Erro ao realizar o cadastro",
        type: "danger",
      });
      setLoad(false)

    }

  }


  return (

    <Formik
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {(props) => (
        <FormContainer>
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

            <Input 
              name="name"
              placeholder="Nome" 
              width={100}
              value={props.values.name} 
              onChangeText={props.handleChange('name')}
              onBlur={props.handleBlur('name')}
              error={props.errors.name && props.touched.name ? (props.errors.name) : null}
            />

            <Input 
              name="lastName"
              placeholder="Sobrenome" 
              width={100}
              value={props.values.lastName} 
              onChangeText={props.handleChange('lastName')}
              onBlur={props.handleBlur('lastName')}
              error={props.errors.lastName && props.touched.lastName ? (props.errors.lastName) : null}
            />

            <InputsMusk 
              name="phoneNumber"
              placeholder="Telefone com DDD" 
              width={100}
              value={props.values.phoneNumber} 
              onChangeText={props.handleChange('phoneNumber')}
              onBlur={props.handleBlur('phoneNumber')}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              error={props.errors.phoneNumber && props.touched.phoneNumber ? (props.errors.phoneNumber) : null}
            />

            <InputsMusk 
              name="cpf"
              placeholder="CPF" 
              width={100}
              value={props.values.cpf} 
              onChangeText={props.handleChange('cpf')}
              onBlur={props.handleBlur('cpf')}
              type={'cpf'}
              error={props.errors.cpf && props.touched.cpf ? (props.errors.cpf) : null}
            />

            <Input 
              name="password"
              placeholder="Senha" 
              width={100}
              value={props.values.password} 
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              secureTextEntry
              error={
                props.errors.password && props.touched.password ? (props.errors.password) : null
              }
            />

            <Input 
              name="confirmPassword"
              placeholder="Confirmar Senha" 
              width={100}
              value={props.values.confirmPassword} 
              onChangeText={props.handleChange('confirmPassword')}
              onBlur={props.handleBlur('confirmPassword')}
              secureTextEntry
              error={
                props.errors.confirmPassword && props.touched.confirmPassword ? (props.errors.confirmPassword) : null
              }
            />

            <Separator width={'100'} height={'30'}/>

            { load
              ? <ActivityIndicator color={theme.colors.success} />
              : (
                <Button 
                  text="Criar conta" 
                  isActive={true} 
                  radius 
                  width={50}
                  magin={'10px 0'}
                  onPress={() => {
                    setInitialValues(props.values);
                    createUser(props.values);
                  }} 
                  
                />
              )
            }

          <Separator width={'100'} height={'30'}/>

          </LoginForm>
        </FormContainer>
      )}
    </Formik>

  )
}
