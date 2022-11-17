import React, { useState, useEffect } from 'react';

import { CardInputs, Container, ContainerButton, Content, Header, ContainerInputs } from './styles';

import Input from '../../../components/Inputs';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import MainTitle from '../../../components/MainTitle';
import HeaderMenu from '../../../components/HeaderMenu';
import InputsMask from '../../../components/InputsMask';

import * as yup from "yup";
import { Formik } from "formik";

export default function CardHolder(props) {

  const [cardHolder, setCardHolder] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    cpf: '',
    birthDate: ''
  });

  const cardholderValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    email: yup
      .string()
      .email("Deve ser um email válido")
      .required("Preenchimento Obrigatório"),
    phoneNumber: yup
      .string()
      .min(11, "Deve ser um número de telefone válido")
      .required("Preenchimento Obrigatório"),
    cpf: yup
      .string()
      .min(11, "Deve ser um CPF válido")
      .required("Preenchimento Obrigatório"),
    birthDate: yup
      .string()
      .min(6, "Deve ser no formato de data válido. (ex. 01/01/86)")
      .required("Preenchimento Obrigatório"),
  });

  function handleCardHolder(values) {
    props.setHolderData(true)
    setCardHolder(values);
    props.setCardHolder(values);
    props.closeCardHolder();
    console.log(values)
  }

  return (
    <Container>
      {/* <HeaderMenu /> */}
      <Content>
        <Header>
          <MainTitle title='Adicionar Cartão' />
        </Header>

        <Formik
          validationSchema={cardholderValidationSchema}
          initialValues={
            props.cardHolder
          }
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, validateForm, touched, onChange }) => (
          
          <ContainerInputs>
            <CardInputs>

              <MainTitle 
                title='Dados obrigatórios do titular:'
                size={16}
              />

              <Input 
                id="name"
                name="name"
                placeholder="Nome completo do titular do cartão" 
                width={100}
                value={values.name} 
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={errors.name && touched.name ? (errors.name) : null}
              />

              <Input 
                name="email"
                placeholder="E-mail" 
                width={100}
                value={values.email} 
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email && touched.email ? (errors.email) : null}
              />

              <InputsMask 
                name="phoneNumber"
                placeholder="Telefone com DDD" 
                width={100}
                value={values.phoneNumber} 
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                error={errors.phoneNumber && touched.phoneNumber ? (errors.phoneNumber) : null}
              />

              <InputsMask 
                name="cpf"
                placeholder="CPF" 
                width={100}
                value={values.cpf} 
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                type={'cpf'}
                error={errors.cpf && touched.cpf ? (errors.cpf) : null}
              />

              <InputsMask 
                id="birthDate"
                name="birthDate"
                placeholder="Data de nascimento do titular do cartão" 
                width={100}
                value={values.birthDate} 
                onChangeText={handleChange('birthDate')}
                onBlur={handleBlur('birthDate')}
                type={'datetime'}
                options={{
                  format: 'dd/MM/YY'
                }}
                error={errors.birthDate && touched.birthDate ? (errors.birthDate) : null}
              />
              
              <Separator width={'100'} height={'15'}/>

              <ContainerButton>
                <Button
                text='Continuar'
                isActive
                width={30} 
                radius
                onPress={async(e) => {
                  setCardHolder({...values})
                  handleCardHolder(values)
                }}
                // onPress={async(e) => {
                //     // console.log(values)
                //     // setCardHolder({...values})
                //     // handleCardHolder({...values})
                //     props.closeCardHolder
                //     // handleSaveAddressData()
                //     // navigation.navigate('MyProfile')
                //     // e.preventDefault();
                //     // validateForm().then((result) => {
                //     //   if (Object.keys(result).length === 0) {
                //     //     createUser(values);
                        
                //     //   } else {
                //     //       Alert.alert('Erro cadastro', 'Por favor, verifique todos os campos acima antes de continuar.');
                //     //   }
                //     // })
                //     // handleSubmit
                //   }
                // }
              />
              </ContainerButton>
              
            </CardInputs>
          </ContainerInputs>
        )}
        </Formik>

      </Content>
    </Container>
  );
}