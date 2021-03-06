import React, {useState } from 'react'
import { StyleSheet, TouchableOpacity, Button, ImageBackground,  TextInput, Text, SafeAreaView, Image, Dimensions} from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {updateProfile} from "firebase/auth";
import { getDocs, getFirestore, collection, query, where, doc, updateDoc, addDoc} from 'firebase/firestore/lite'
import BackButton from '../components/BackButton';

export default function EditProfileScreen({ navigation }) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const oldName = firebase.auth().currentUser?.displayName
    const db = getFirestore()

    const updateFirestore = async () => {
        try {
            const list = [];
            const colRef = collection(db, 'posts')
            const q = query(colRef, where("name", "==", oldName));
            const querySnapshot = await getDocs(q);   
            querySnapshot.forEach((doc) => {
                list.push(doc.id)
            })
            const list2 = [];
            const colRef2 = collection(db, 'comments')
            const q2 = query(colRef2, where("name", "==", oldName));
            const querySnapshot2 = await getDocs(q2);   
            querySnapshot2.forEach((doc) => {
                list2.push(doc.id)
            })
            list.map(id => updateDoc(doc(db, "posts", id), {
                name: name
            }))
            list2.map(id => updateDoc(doc(db, "comments", id), {
                name: name
            }))
            const colRef3 = collection(db, 'users')
            await addDoc(colRef3, {
                username: name
              })
        } catch (error) {
            console.log(error)
        }
    }

    const updateName = async () => {
        try {
            updateProfile(firebase.auth().currentUser, {
                displayName: name
            }).then(() => {
                updateFirestore()
                setName(null)
            })
        } catch (error) {
          console.log(error)
        }
    }

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

    const usernameTaken = async () => {
        try {
            const colRef = collection(db, 'users')
            const q = query(colRef, where("username", "==", name));
            const querySnapshot = await getDocs(q);  
            const list = [];
            querySnapshot.forEach((doc) => {
                    const {
                        username
                      } = doc.data();
                    list.push({...doc.data(), id: doc.id })
            })
            if (list.length == 0) {
              return false
            } else {
              //username taken
              return true
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async () => {
        if (name == null|| email == null) {
            alert("Fields cannot be empty")
            return
        }
        if (name == oldName) {
            alert("Your new username cannot be same as your old username")
            return
        }
        const taken = await usernameTaken()
        if (taken) {
            alert("Username taken. Choose another username")
            return
        }
        const response = await sendEmailWithPassword(email)
        if (response.error) {
            alert('Email account does not exist')
        } else {
            setEmail(null)
            await updateName() 
            alert('Username updated. Check your email to change your password')
        }
    }
    
    return(
    <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
        <SafeAreaView style={styles.container}>
        <BackButton goBack={ navigation.goBack }/>
            <Text style={styles.header}>
                Edit your profile
            </Text>
            <TextInput 
             style={styles.nameBox}
             placeholder="Edit name"
             value={name}
             onChangeText={name => setName(name)}
             />
             <TextInput 
             style={styles.emailBox}
             placeholder="Enter email to edit password"
             value={email}
             onChangeText={email => setEmail(email)}
             />
             <TouchableOpacity
             style={styles.button}
             onPress= {updateUser}>
                 <Text
                 style={styles.buttonText}>
                     Save
                </Text>
            </TouchableOpacity>
         </SafeAreaView>
    </ImageBackground>
   
    )
}


const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30
    },
    nameBox: {
        fontSize: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#525252',
        height: 44,
        width: Dimensions.get('window').width - 30,
        padding: 10
    },
    emailBox: {
        fontSize: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#525252',
        height: 44,
        width: Dimensions.get('window').width - 30,
        padding: 10
    },
    button: {
        width: 100,
        backgroundColor: "#ebd234",
        padding: 5,
        marginTop: 5,
        borderRadius: 20
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})