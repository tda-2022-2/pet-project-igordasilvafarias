import React, { useState, useEffect } from 'react';

import { ContainerInputs, ContainerRowInputs } from '../MyAddress/styles';
import { CardInputs, Container, ContainerButton, Content, Header } from './styles';

import CardHolder from './CardHolder';
import Input from '../../components/Inputs';
import Button from '../../components/Button';
import Separator from '../../components/Separator';
import MainTitle from '../../components/MainTitle';
import HeaderMenu from '../../components/HeaderMenu';
import InputsMask from '../../components/InputsMask';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { useUser } from '../../contexts/UserContext'
import * as yup from "yup";
import { Formik } from "formik";
import { StackActions } from '@react-navigation/native';

import { showMessage } from 'react-native-flash-message';

export default function MyCard() {
  const { userData, setUserData, createDataList } = useUser();

  const navigation = useNavigation();

  const [holderData, setHolderData] = useState(false);

  const [cardHolder, setCardHolder] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    cpf: '',
    birthDate: ''
  });

  const [cardHolderModalOpen, setCardHolderModalOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({
    number: '',
    holderName: '',
    validate: '',
    cvv: ''
  });

  const cardValidationSchema = yup.object().shape({
    number: yup
      .string()
      .min(16, "Verifique o número do seu cartão.")
      .required("Campo Obrigatório"),
    holderName: yup
      .string()
      .min(2, "Verifique o nome que consta no seu cartão.")
      .required("Campo Obrigatório"),
    validate: yup
      .string()
      .min(4, "Verifique a data de validade do seu cartão.")
      .required("Campo Obrigatório"),
    cvv: yup
      .string()
      .min(3, "Verifique o número verificação do seu cartão.")
      .required("Campo Obrigatório"),
  })

  function handleCardHolderOpen() {
    setCardHolderModalOpen(true);
  }

  function handleCardHolderClose() {
    setCardHolderModalOpen(false);
  }

  async function handleSaveCardData(values) {
    setInitialValues({...values});
   
    try {


      await createDataList('cards', {
        ...values, ...cardHolder
      })

      navigation.dispatch(
        StackActions.replace('MyProfile')
      )
      showMessage({
        message: "Cartão cadastrado com sucesso.",
        type: "success",
      });

    } catch (err) {
      console.log(err);
      showMessage({
        message: "Erro ao cadastrar o cartão.",
        type: "danger",
      });
    }

  }


  return (
    <Container>
      <HeaderMenu />
      <Content>
        <Header>
          <MainTitle title='Adicionar Cartão' />
        </Header>

        <Formik
          validationSchema={cardValidationSchema}
          initialValues={
            initialValues
          }
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, validateForm, touched, onChange }) => (
          <ContainerInputs>
            <CardInputs>
              <ContainerButton>
                <Button
                  text='Editar dados do titular'
                  isActive
                  width={50} 
                  radius
                  onPress={handleCardHolderOpen}
                />
              </ContainerButton>

                <Separator width={'100'} height={'10'}/>

                <InputsMask 
                  id="number"
                  name="number"
                  placeholder="Número do cartão de crédito" 
                  width={100}
                  value={values.number} 
                  onChangeText={handleChange('number')}
                  onBlur={handleBlur('number')}
                  type={'credit-card'}
                  options={{
                    obfuscated: false
                  }}
                  error={errors.number && touched.number ? (errors.number) : null}
                />

                <Input 
                  id="holderName"
                  name="holderName"
                  placeholder="Nome do titular (como está no cartão)" 
                  width={100}
                  value={values.holderName} 
                  onChangeText={handleChange('holderName')}
                  onBlur={handleBlur('holderName')}
                  error={errors.holderName && touched.holderName ? (errors.holderName) : null}
                />

                <ContainerRowInputs>

                <InputsMask 
                  id="validate"
                  name="validate"
                  placeholder="Validade (mm/aa)" 
                  width={40}
                  value={values.validate} 
                  onChangeText={handleChange('validate')}
                  onBlur={handleBlur('validate')}
                  type={'datetime'}
                  options={{
                    format: 'MM/YY'
                  }}
                  error={errors.validate && touched.validate ? (errors.validate) : null}
                />

                <InputsMask 
                  id="cvv"
                  name="cvv"
                  placeholder="CVV" 
                  width={40}
                  value={values.cvv} 
                  onChangeText={handleChange('cvv')}
                  onBlur={handleBlur('cvv')}
                  type={'custom'}
                  options={{
                    mask: '999'
                  }}
                  error={errors.cvv && touched.cvv ? (errors.cvv) : null}
                />

                </ContainerRowInputs>
                

                <Separator width={'100'} height={'30'}/>

                <ContainerButton>
                  <Button
                  text='Finalizar e adicionar cartão de crédito'
                  isActive
                  width={75} 
                  radius
                  disabled={holderData ? false : true}
                  onPress={async(e) => {
                      setInitialValues({...values});
                      handleSaveCardData(values);
                    }
                  }
                />
                </ContainerButton>
              
            </CardInputs>
          </ContainerInputs>
        )}
        </Formik>
      <Modal visible={cardHolderModalOpen}>
        <CardHolder 
          cardHolder={cardHolder}
          setCardHolder={setCardHolder}
          closeCardHolder={handleCardHolderClose}
          setHolderData={setHolderData}
        />
      </Modal>

      </Content>
    </Container>
  );
}