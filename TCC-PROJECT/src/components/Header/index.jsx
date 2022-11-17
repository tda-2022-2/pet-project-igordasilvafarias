import React from 'react';
import { View, Text, Image } from 'react-native';
import {
  Container,
  ImageLogo
} from './styles';

import LogoSigar from '../../assets/images/sigar.png';


export default function Header() {
  return (
    <Container>
      <ImageLogo source={LogoSigar} />
    </Container>
  )
}
