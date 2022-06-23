import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  TextInput, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import nameValidation from '../Firebase/nameValidation'
import emailValidation from '../Firebase/emailValidation'
import passwordValidation from '../Firebase/passwordValidation'
import BackButton from '../components/BackButton';
import { getDocs, getFirestore, collection, addDoc, query, where} from 'firebase/firestore/lite'

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirmedPassword, setConfirmedPassword] = useState({ value: '', error: '' })
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

    /*
    const usernameTaken = async () => {
      try {
          const list = [];
          const db = getFirestore()
          const colRef = collection(db, 'users')
          const q = query(colRef, where("username", "==", name.value));
          const querySnapshot = await getDocs(q);   
          querySnapshot.forEach((doc) => {
                  const {
                      username
                    } = doc.data();
                  list.push({...doc.data(), id: doc.id })
              })
          if (list.length != 0) {
            return true
          } else {
            //username not taken, now we will then add the name to firestore
            const docRef = addDoc(colRef, {
              username: name.value
            })
            return false
          }
        } catch (error) {
          console.log(error);
        }
    }*/
      
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
      if (password.value != confirmedPassword.value) {
        alert("Password doesn't match")
        return
      }/*
      if (usernameTaken()) {
        alert("Username taken. Choose another username.")
        return
      }*/
      setLoading(true)
      const response = await signUpUser({
        name: name.value,
        email: email.value,
        password: password.value,
      })
      if (response.error) {
        setError(response.error)
        alert("You have an existing account.")
        return
      }
      setLoading(false)
      alert("You may proceed to log in now.")
      navigation.navigate('LoginScreen')
    }

    return (

      <ImageBackground style={styles.background} source={require("../components/pics/background_logo.png")}>
        <View style={styles.container}>
        <BackButton goBack={ navigation.goBack }/>
        <Text style={styles.header}>
          Let's Get Started!
        </Text>
        <Text>
          Create an account to Charge&Go!
        </Text>

        <TextInput
          style={styles.input}
          placeholder='Name'
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          autoCapitalize="words"
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
         <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          value={confirmedPassword.value}
          onChangeText={(text) => setConfirmedPassword({ value: text, error: '' })}
          error={!!confirmedPassword.error}
          errorText={confirmedPassword.error}
          secureTextEntry
        />

        <TouchableOpacity style = {styles.submitButton} onPress={onSignUpPressed}>
          <Text style={styles.submitButtonText}> Sign Up </Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={ toLogin }>
            <Text style={styles.login}>Login</Text>
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
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    login: {
      fontWeight: 'bold',
      color: '#414757'
    },
    header: {
      fontSize: 30,
      fontWeight: "bold"
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
