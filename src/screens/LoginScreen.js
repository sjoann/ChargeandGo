import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Button, TextInput, Text } from 'react-native'
import emailValidation from '../Firebase/emailValidation'
import passwordValidation from '../Firebase/passwordValidation'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import BackButton from '../components/BackButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  
  const loginUser = async ({ email, password }) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      return { user }
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }
  
  const onLoginPressed = async () => {
    const emailError = emailValidation(email.value)
    const passwordError = passwordValidation(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setLoading(true)
    const response = await loginUser({
      email: email.value,
      password: password.value,
    })
    if (response.error) {
      setError(response.error)
    }
    setLoading(false)
    navigation.navigate('HomeScreen')
  }

  return (
    <View style= {styles.container}>
      <BackButton goBack={ navigation.goBack }/>
      <Text style={styles.header}>
           Welcome Back.
      </Text>
      <TextInput
        placeholder='Email'
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        placeholder='Password'
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
       onPress={onLoginPressed}
       title="Sign in"
       >
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24
    },
    header: {
        fontSize: 21,
        color:  '#414757',
        fontWeight: 'bold',
        paddingVertical: 12
    },
    row: {
        flexDirection: 'row',
        marginTop: 4
      },
    forgot: {
        fontSize: 13,
        color: '#414757'
    },
    link: {
        fontWeight: 'bold',
        color: '#414757'
    }
})