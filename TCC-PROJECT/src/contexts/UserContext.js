import React, { useContext, createContext, useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import auth, { firebase } from '@react-native-firebase/auth';

export const UserContext = createContext({})

export function UserProvider({ children }) {
  const db = database().ref();

  const [userData, setUserData] = useState()

  async function loginUser(email, password) {
    try {
      const response = await auth()
        .signInWithEmailAndPassword(email, password);
        setUserData({
          ...userData,
          email: response.user.email,
          id: response.user.uid
        })
  
      } catch (err) {
        console.log(err)
        throw new Error('Error signing', err)
      }
  }

  async function forgotPassword(email) {
    try {
      await auth()
      .sendPasswordResetEmail(email)


    } catch (err) {
      console.log(err)
      throw new Error('Error forgot password', err)
    }
  }

  async function createDataList(categoryName, dataObject) {

    try {
      database().ref(`/users/${userData.id}/${categoryName}/${uuid.v4()}`)
      .set(dataObject)
      
    } catch (error) {
      console.log(error);
    }

  }

  async function updateDataList(categoryName, dataObject, itemId) {

    try {
      database().ref(`/users/${userData.id}/${categoryName}/${itemId}`)
      .update(dataObject)
      
    } catch (error) {
      console.log(error);
    }

  }

  async function removeDataList(categoryName, dataId) {

    try {
      database().ref(`/users/${userData.id}/${categoryName}/${dataId}`)
      .remove()
      
    } catch (error) {
      console.log(error);
    }

  }
  
  async function findOrdersByUser() {
    try {

      const user = await firebase.auth().currentUser;

      let snapshot = await db
        .child('/orders/')
        .orderByChild('userId')
        .equalTo(`${user.uid}`)
        .once('value');

      let orders = snapshot.val()

      if(orders) {

        orders = Object.entries(orders);
        return orders

      } else {
        return []
      }
      
    } catch (error) {
      console.log(error);
      throw new Error('Error on get orders', error)

    }
  }

  async function findUserByEmail(email) {

    if (!email) {
      throw new Error('email is required');
    }

    try {

      let snapshot = await db
        .child('/users/')
        .orderByChild('email')
        .equalTo(`${email}`)
        .once('value');

      const [userFinded] = Object.entries(snapshot.val());
      const [id, user] = userFinded;
      setUserData({...userData, user})
      return user;

    } catch (err) {
      console.log(err)
      throw new Error('User not found')
    }

  }

  async function getUserCards() {
    try {

      const user = await firebase.auth().currentUser;

      let snapshot = await db
        .child('/users/')
        .orderByChild('email')
        .equalTo(`${user.email}`)
        .once('value');

      const [userFinded] = Object.entries(snapshot.val());
      const [id, data] = userFinded;

      if(data.cards) {
        return Object.entries(data.cards)
        
      } else {
        return []
      }
      
    } catch (error) {
      console.log(error);
      throw new Error('Error on get cards', error)

    }

  }

  return (
    <UserContext.Provider value={{
      userData,
      loginUser,
      setUserData,
      createDataList,
      updateDataList,
      removeDataList,
      findOrdersByUser,
      forgotPassword,
      getUserCards,
      findUserByEmail
    }}>
      { children }
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext);
}