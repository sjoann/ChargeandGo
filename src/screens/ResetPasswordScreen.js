import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Text, ImageBackground, TouchableOpacity } from "react-native";
import emailValidation from '../Firebase/emailValidation';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import BackButton from '../components/BackButton';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)

  const sendEmailWithPassword = async (email) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      return {}
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidation(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    setLoading(true)
    const response = await sendEmailWithPassword(email.value)
    if (response.error) {
        alert('Invalid email. You do not have an account yet.')
    } else {
        alert('Email with instructions has been sent.')
    }
    setLoading(false)
  }

  return (
    <ImageBackground style={styles.background} source={require("../components/pics/background_logo.png")}>

      <View style={styles.container}>
        <BackButton goBack={ navigation.goBack }/>
        <Text style={styles.header}>
            Restore Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your Email'
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          autoCapitalize="none"
          description="You will receive email with password reset link."
          error={!!email.error}
          errorText={email.error}
          keyboardType="email-address"
        />
        <TouchableOpacity style = {styles.submitButton} onPress={sendResetPasswordEmail}>
          <Text style = {styles.submitButtonText}> Reset Password </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
      fontSize: 21,
      color:  'black',
      fontWeight: 'bold',
      paddingVertical: 12
  },
  background: {
    flex: 1
  },
  input: {
    margin: 7,
    height: 40,
    width: 300,
    padding: 10,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#fcba03',
    padding: 10,
    marginBottom: 15,
    height: 40,
    borderRadius: 10,
    width: 300
  },
  submitButtonText:{
    color: 'black',
    textAlign: 'center'
  }
})