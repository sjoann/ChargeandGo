import React from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  TextInput, ImageBackground, useState } from 'react-native'
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
      <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
        <View style= {styles.container}>
          <Text style={styles.header}>
            Welcome Back, {firebase.auth().currentUser?.displayName}
          </Text>

          <Button
               title="Log out"
               onPress={logoutUser}
               style={styles.logOutButton}
           ></Button>
        </View>

      </ImageBackground>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    flex: 1
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
})


