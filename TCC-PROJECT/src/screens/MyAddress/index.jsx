import React, { useState, useEffect } from 'react';
import {
  CardInputs,
  Container,
  Header, 
  Content,
  ContainerInputs,
  ContainerButton
} from './styles';
import { Modal } from 'react-native';
import StateSelect from '../StateSelect';
import Input from '../../components/Inputs';
import Select from '../../components/Select';
import Button from '../../components/Button';
import MainTitle from '../../components/MainTitle';
import Separator from '../../components/Separator';
import HeaderMenu from '../../components/HeaderMenu';
import InputsMask from '../../components/InputsMask';
import { useUser } from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/core'
import { showMessage } from 'react-native-flash-message';
import { StackActions } from '@react-navigation/native';

import * as yup from "yup";
import { Formik } from "formik";

export default function MyAddress({route}) {

  const { userData, setUserData, createDataList, updateDataList } = useUser();
  const [isEditable, setIsEditable] = useState(false);
  const [itemId, setItemId] = useState('');

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState();
  const [cep, setCep] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [comp, setComp] = useState();
  const [bairro, setBairro] = useState();
  const [city, setCity] = useState();
  const [uf, setUf] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');

  const [initialValues, setInitialValues] = useState({
    name: '',
    lastname: '',
    cep: '',
    street: '',
    number: '',
    comp: '',
    bairro: '',
    city: '',
    state: '',
    uf: '',
    phoneNumber: ''
  });

  const addressValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    lastname: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    cep: yup
      .string()
      .min(5, "Deve conter pelo menos 5 caracteres")
      .required("Preenchimento Obrigatório"),
    street: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    number: yup
      .string()
      .min(1, "Deve conter pelo menos 1 caracter")
      .required("Preenchimento Obrigatório"),
    comp: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    bairro: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    city: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    state: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
    phoneNumber: yup
      .string()
      .min(2, "Deve conter pelo menos 2 caracteres")
      .required("Preenchimento Obrigatório"),
  });

  const [state, setState] = useState('');
  const [stateSelectModalOpen, setStateSelectModalOpen] = useState(false);

  function handleOpenStateSelectModal() {
    setStateSelectModalOpen(true);
  }

  function handleCloseStateSelectModal() {
    setStateSelectModalOpen(false);
  }

  async function handleSaveAddressData(values) {

    try {

      await createDataList('addreses', {
        name: values.name,
        lastname: values.lastname,
        cep: values.cep,
        street: values.street,
        number: values.number,
        comp: values.comp,
        bairro: values.bairro,
        city: values.city,
        state: state.name,
        uf: state.key,
        phoneNumber: values.phoneNumber
      })

      navigation.dispatch(
        StackActions.replace('MyProfile')
      )
      showMessage({
        message: "Endereço cadastrado com sucesso.",
        type: "success",
      });

    } catch (err) {
      console.log(err);
      showMessage({
        message: "Erro ao cadastrar o Endereço.",
        type: "danger",
      });
    }

  }

  function handleCloseStateSelectModal() {
    setStateSelectModalOpen(false);
  }

  async function handleUpdateAddressData(values) {
    try {
      await updateDataList('addreses', {
        name: values.name,
        lastname: values.lastname,
        cep: values.cep,
        street: values.street,
        number: values.number,
        comp: values.comp,
        bairro: values.bairro,
        city: values.city,
        state: state.name,
        uf: state.key,
        phoneNumber: values.phoneNumber
      }, itemId)

      navigation.navigate('MyProfile')
      showMessage({
        message: "Endereço atualizado com sucesso.",
        type: "success",
      });


    } catch (err) {
      console.log(err);
      showMessage({
        message: "Erro ao atualizar o Endereço.",
        type: "danger",
      });
    }

  }

  useEffect(() => {
    setIsEditable(route.params.isEditable)
    if (route.params.address) {
      setItemId(route.params.itemId)
      setInitialValues(route.params.address)
      setName(initialValues.name)
      setLastname(initialValues.lastname)
      setCep(initialValues.cep)
      setStreet(initialValues.street)
      setNumber(initialValues.number)
      setComp(initialValues.comp)
      setBairro(initialValues.bairro)
      setCity(initialValues.city)
      setState(initialValues.state)
      setUf(initialValues.uf)
      setPhoneNumber(initialValues.phoneNumber)
    }
  }, [initialValues])

  function handleTitle() {
    let mainTitle = '';

    if (!isEditable) {
      mainTitle = "Adicionar Endereço";
    } else {
      mainTitle = "Editar Endereço";
    }

    return String(mainTitle);
  }

  return (
    <Container>
      <HeaderMenu />
      <Content>
        <Header>
          <MainTitle title={`${handleTitle()}`} />
        </Header>

        <Formik
          validationSchema={addressValidationSchema}
          initialValues={
            initialValues
          }
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, validateForm, touched, onChange}) => (
            
          <ContainerInputs>
            <CardInputs>

              <Input 
                id="name"
                name="name"
                placeholder="Nome" 
                width={100}
                value={values.name = name}
                onChangeText={(value) => { setName(value) }}
                onBlur={handleBlur('name')}
                error={errors.name && touched.name ? (errors.name) : null}
              />

              <Input 
                id="lastname"
                name="lastname"
                placeholder="Sobrenome" 
                width={100}
                value={values.lastname = lastname} 
                onChangeText={(value) => { setLastname(value) }}
                onBlur={handleBlur('lastname')}
                error={errors.lastname && touched.lastname ? (errors.lastname) : null}
              />

              <InputsMask 
                id="cep"
                name="cep"
                placeholder="CEP" 
                width={100}
                value={values.cep = cep} 
                onChangeText={(value) => { setCep(value) }}
                onBlur={handleBlur('cep')}
                type={'custom'}
                options={{
                  mask: '99.999-999'
                }}
                error={errors.cep && touched.cep ? (errors.cep) : null}
              />

              <Input 
                id="street"
                name="street"
                placeholder="Logradouro" 
                width={100}
                value={values.street = street} 
                onChangeText={(value) => { setStreet(value) }}
                onBlur={handleBlur('street')}
                error={errors.street && touched.street ? (errors.street) : null}
              />

              <Input 
                id="number"
                name="number"
                placeholder="Número" 
                width={100}
                value={values.number = number} 
                onChangeText={(value) => { setNumber(value) }}
                onBlur={handleBlur('number')}
                error={errors.number && touched.number ? (errors.number) : null}
              />

              <Input 
                id="comp"
                name="comp"
                placeholder="Complemento" 
                width={100}
                value={values.comp = comp} 
                onChangeText={(value) => { setComp(value) }}
                onBlur={handleBlur('comp')}
                error={errors.comp && touched.comp ? (errors.comp) : null}
              />

              <Input 
                id="bairro"
                name="bairro"
                placeholder="Bairro" 
                width={100}
                value={values.bairro = bairro} 
                onChangeText={(value) => { setBairro(value) }}
                onBlur={handleBlur('bairro')}
                error={errors.bairro && touched.bairro ? (errors.bairro) : null}
              />

              <Input 
                id="city"
                name="city"
                placeholder="Cidade" 
                width={100}
                value={values.city = city} 
                onChangeText={(value) => { setCity(value) }}
                onBlur={handleBlur('city')}
                error={errors.city && touched.city ? (errors.city) : null}
              />

              <Select
                id="state"
                name="state"
                value={values.state = state}
                title={state === '' ? 'Estado' : state.name || state}
                onPress={handleOpenStateSelectModal}
                onBlur={handleBlur('state')}
                error={errors.state && touched.state || state === '' ? (errors.state) : null}
              />

              <InputsMask 
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Telefone com DDD" 
                width={100}
                value={values.phoneNumber = phoneNumber} 
                onChangeText={(value) => { setPhoneNumber(value) }}
                onBlur={handleBlur('phoneNumber')}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                error={errors.phoneNumber && touched.phoneNumber ? (errors.phoneNumber) : null}
              />

              <Separator width={'100'} height={'10'}/>

              <ContainerButton>
                <Button
                  text='Salvar'
                  isActive
                  width={30} 
                  radius
                  onPress={async(e) => {
                      if (!isEditable) {
                        setInitialValues({...values, state: state.name, uf: state.key})
                        handleSaveAddressData(values)
                      } else {

                        setInitialValues({...values, state: state, uf: state.key})
                        handleUpdateAddressData(values)
                      }
                      // setInitialValues({...values, state: state.value, uf: state.key})
                      // handleSaveAddressData(values)
                      // navigation.navigate('MyProfile')
                      // e.preventDefault();
                      // validateForm().then((result) => {
                      //   if (Object.keys(result).length === 0) {
                      //     createUser(values);
                          
                      //   } else {
                      //       Alert.alert('Erro cadastro', 'Por favor, verifique todos os campos acima antes de continuar.');
                      //   }
                      // })
                      // handleSubmit
                    }
                  }
                />
              </ContainerButton>
            </CardInputs>
          </ContainerInputs>
        )}
        </Formik>

    <Modal visible={stateSelectModalOpen}>
      <StateSelect
        state={state}
        setState={setState}
        closeStateSelect={handleCloseStateSelectModal}
      />
    </Modal>

     </Content>
    </Container>
  )
}