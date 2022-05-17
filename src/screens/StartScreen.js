import React from 'react'
import { StyleSheet, View, Button, ImageBackground, Image, TouchableOpacity, Text } from 'react-native'

export default function StartScreen({ navigation }) {
  return (
    <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
      <View style={styles.container}>

        <Image style={styles.logo} source={require("../components/pics/logo.png")}/>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>



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
    },
    welcome: {
      fontSize: 21,
      color:  '#f0d975',
      fontWeight: 'bold',
      paddingVertical: 12
    },
    subwelcome: {
      fontSize: 12,
      lineHeight: 17,
      textAlign: 'center',
      marginBottom: 12,
    },
    background: {
      flex: 1
    },
    logo: {
      height: 180,
      width: 180,
      resizeMode: "contain"
    },
    button: {
      width: 90,
      backgroundColor: "#ebd234",
      padding: 10,
      marginTop: 10,
      borderRadius: 10
    },
    buttonText: {
      color: "black",
      textAlign: "center"
    },
})