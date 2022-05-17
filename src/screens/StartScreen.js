import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
          Charge&Go
      </Text>
      <Text style={styles.subwelcome}>
          Helping you to locate EV charging points with ease
      </Text>
      <Button
        onPress={() => navigation.navigate('LoginScreen')}
        title="Login"
      >
      </Button>
      <Button
        onPress={() => navigation.navigate('RegisterScreen')}
        title="Sign up"
        >
      </Button>
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
      }
})