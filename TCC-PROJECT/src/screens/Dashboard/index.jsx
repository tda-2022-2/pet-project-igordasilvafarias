import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import HeaderMenu from '../../components/HeaderMenu';
import { useNavigation } from '@react-navigation/core'
import { showMessage } from 'react-native-flash-message';
import { useTheme } from 'styled-components';
import { Camera } from 'expo-camera';

 // Products samples
 // 3219820003987
 // 107050020610
 // 107050020940
 // 106152220860

import Input from '../../components/Inputs';
import Button from '../../components/Button';
import TabBar from '../../components/TabBar';

import {
  Container,
  CameraContainer, 
  CameraInside, 
  // Camera, 
  InputFormContainer
} from './styles';

import { ActivityIndicator, Text, Alert } from 'react-native'

import { useUser } from '../../contexts/UserContext'
import { useProduct } from '../../contexts/ProductContext'

export default function Dashboard() {
  const navigation = useNavigation();
  const theme = useTheme();

  const { userData, setUserData } = useUser();
  const { findProductByCode } = useProduct()

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState()
  const [load, setLoad] = useState(false);
  const [startCamera, setStartCamera] = useState(false)

  const db = database().ref();
  const permission = async () => {
     
    const {status} = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
      setHasPermission(true)
    } else {
      Alert.alert('Access denied')
    }
  };
  useEffect(() => {
    permission();
  }, [hasPermission]);

  const handleBarCodeScanned = (scanResult) => {
    console.log({ scanResult });
    const { type, data } = scanResult;
    setScanned(true);
    setCode(scanResult.data);
    handleFindProduct(scanResult.data)
    setTimeout(() => {
      setScanned(false);
    }, 1000);
  };

  async function handleFindProduct(data) {

    setLoad(true);

    try {

      const product = await findProductByCode(data);

      navigation.navigate('Product', {
        barCode: product
      })
      setCode(null)
      setLoad(false);

    } catch (err) {
      setCode(null);
      setScanned(false)
      setLoad(false);
      showMessage({
        message: "Produto não encontrado.",
        type: "danger",
      });

    }
  }
  
  return (
    <Container>
    <HeaderMenu />
     <CameraContainer>
       
      { startCamera
        ?   
        <Camera
          style={{ 
            height: 600, 
            width: 600,
            alignSelf: 'center'
           }} 
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        : <></>
      }
      
      </CameraContainer>

      <InputFormContainer>
        <Input
          value={code ? `${code}`: ''}
          onChangeText={value => setCode(value)}
          placeholder='Ou digite o código do produto'
          keyboardType='numeric'
          width={90}
        >
        </Input>

        { load
          ? <ActivityIndicator color={theme.colors.success} />
          : (
            <Button 
              text="Buscar" 
              isActive={true} 
              width={60} 
              radius
              onPress={() => handleFindProduct(code)}
              />

          )
        }
       
      </InputFormContainer>
      <TabBar/>
      
    </Container>
  )
}