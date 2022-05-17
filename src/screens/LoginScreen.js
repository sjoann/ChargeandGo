import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, TextInput, Text, ImageBackground } from 'react-native'
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
      alert("You do not have an account yet.")
      return
    }
    setLoading(true)
    const response = await loginUser({
      email: email.value,
      password: password.value,
    })
    if (response.error) {
      setError(response.error)
      alert("Wrong email or password. Try again.")
      return
    }
    setLoading(false)
    navigation.navigate('HomeScreen')
  }

  return (
    <ImageBackground style={styles.background} source={require("../components/pics/background_logo.png")}>

      <View style= {styles.container}>
        <BackButton goBack={ navigation.goBack }/>
        <Text style={styles.header}>
            Welcome Back!
        </Text>
        <Text>
          Log in to your existing account
        </Text>
        <TextInput
          style = {styles.input}
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
          style = {styles.input}
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

        <TouchableOpacity style = {styles.submitButton} onPress={onLoginPressed}>
          <Text style = {styles.submitButtonText}> Sign In </Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
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
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginRight: 90,
        marginBottom: 24
    },
    header: {
        color:  'black',
        fontWeight: 'bold',
        fontSize: 30,
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
      borderRadius: 10
    },
    submitButton: {
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