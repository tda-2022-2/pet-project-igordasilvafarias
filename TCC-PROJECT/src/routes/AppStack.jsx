import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import PasswordRecovery from '../screens/PasswordRecovery';

import Dashboard from '../screens/Dashboard';
import MyOrders from '../screens/MyOrders';
import MyProfile from '../screens/MyProfile';
import MyCart from '../screens/MyCart';
import MyAddress from '../screens/MyAddress';
import StateSelect from '../screens/StateSelect';
import MyCard from '../screens/MyCard';
import Product from '../screens/Product';
import Checkout from '../screens/Checkout';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
      />

      <Stack.Screen
        name="PasswordRecovery"
        component={PasswordRecovery}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
      />

      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
      />

      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
      />

      <Stack.Screen
        name="MyCart"
        component={MyCart}
      />

      <Stack.Screen
        name="MyAddress"
        component={MyAddress}
      />

      <Stack.Screen
        name="StateSelect"
        component={StateSelect}
      />

      <Stack.Screen
        name="MyCard"
        component={MyCard}
      />

      <Stack.Screen
        name="Product"
        component={Product}
      />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
      />

    </Stack.Navigator>
  )
}

export default AppStack;