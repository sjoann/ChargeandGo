import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  TextInput } from 'react-native'
import { Text } from 'react-native-paper'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import nameValidation from '../Firebase/nameValidation'
import emailValidation from '../Firebase/emailValidation'
import passwordValidation from '../Firebase/passwordValidation'
import BackButton from '../components/BackButton';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const toLogin = () => {
       navigation.replace('LoginScreen')
    }
  
    const signUpUser = async ({ name, email, password }) => {
        try {
          const user = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
          firebase.auth().currentUser.updateProfile({
            displayName: name,
          })
          return { user }
        } catch (error) {
          return {
            error: error.message,
          }
        }
      }
      
    const onSignUpPressed = async () => {
      const nameError = nameValidation(name.value)
      const emailError = emailValidation(email.value)
      const passwordError = passwordValidation(password.value)
      if (nameError) {
          alert("Name field cannot be empty")
          setName({ ...name, error: nameError })
          setEmail({ ...email, error: emailError })
          setPassword({ ...password, error: passwordError })
          return
      }
      if (emailError) {
        alert("Email field cannot be empty")
        setName({ ...name, error: nameError })
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
      }
      if (passwordError) {
          alert("Password must be at least 5 characters long")
          setName({ ...name, error: nameError })
          setEmail({ ...email, error: emailError })
          setPassword({ ...password, error: passwordError })
          return 
      }
      
      setLoading(true)
      const response = await signUpUser({
        name: name.value,
        email: email.value,
        password: password.value,
      })
      if (response.error) {
        setError(response.error)
      }
      setLoading(false)
    }

    return (
        <View style={styles.container}>
        <BackButton goBack={ navigation.goBack }/>
        <Text style={styles.header}>
           Register Account
        </Text>
        <TextInput
          placeholder='Name'
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          autoCapitalize="words"
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          placeholder='Email'
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder='Password'
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Button
          onPress={ onSignUpPressed }
          style={{ marginTop: 24 }}
          title="Sign up"    
        >
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={ toLogin }>
            <Text style={styles.login}>Login</Text>
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
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    login: {
      fontWeight: 'bold',
      color: '#121330'
    },
    header: {
      fontSize: 21,
      color:  '#f0d975',
      fontWeight: 'bold',
      paddingVertical: 12
  }
})
