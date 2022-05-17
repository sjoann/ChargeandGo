import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Text} from "react-native";
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
        alert('Email with password has been sent.')
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <BackButton goBack={ navigation.goBack }/>
      <Text style={styles.header}>
           Restore Password
      </Text>
      <TextInput
        placeholder='Enter your Email'
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        autoCapitalize="none"
        description="You will receive email with password reset link."
        error={!!email.error}
        errorText={email.error}
        keyboardType="email-address"
      />
      <Button
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
        title="Send instructions"
        ></Button>
    </View>
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
      color:  '#f0d975',
      fontWeight: 'bold',
      paddingVertical: 12
    }
})