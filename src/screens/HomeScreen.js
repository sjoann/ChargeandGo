import React from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  TextInput } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Text,  Appbar, Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function HomeScreen({ navigation }) {
  const logoutUser = () => {
    try {
      firebase.auth().signOut()
      navigation.navigate('StartScreen')
    } catch (error) {
      console.log(error);
    }
  }
 
    return (
        <View style= {styles.container}>
           <Button
               title="Log out"
               onPress={logoutUser}
           ></Button>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


