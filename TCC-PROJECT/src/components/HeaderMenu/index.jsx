import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { StackActions } from '@react-navigation/native';

import {
  Header
} from './styles';

export default function HeaderMenu({returnFunction}) {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Header>
      <TouchableOpacity
        onPress={returnFunction ? returnFunction : () => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={24} color={theme.colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MyCart')}

      >
        <Ionicons name="cart" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </Header>
  )
}