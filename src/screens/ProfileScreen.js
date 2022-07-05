import React from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Text,  Appbar, Provider as PaperProvider } from 'react-native-paper'
import NavigationBar from '../components/NavigationBar'
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProfileScreen({ navigation }) {

  const logoutUser = () => {
    try {
      firebase.auth().signOut()
      navigation.navigate('StartScreen')
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <View style={styles.background}>
        <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
          <View style= {styles.container}>
            <Text style={styles.header}>
              Manage your account
            </Text>
            
            <TouchableOpacity
            onPress={() => navigation.push('EditProfileScreen')}
            >
               <FontAwesome name='user-circle' size={23} />
            </TouchableOpacity>
            <Text style={styles.button}>
                    Edit Profile
            </Text>
            
            <TouchableOpacity
            onPress={() => navigation.push('FeedbackScreen')}
            >
              <FontAwesome name='flag' size={23} />
            </TouchableOpacity>
            <Text style={styles.button}>
              Feedback
            </Text>

            <TouchableOpacity 
            onPress={logoutUser}
            >
              <FontAwesome name='power-off' size={23} />
            </TouchableOpacity>
            <Text style={styles.button}>
                    Log Out
            </Text>
          </View>
        </ImageBackground>
        <NavigationBar navigation={navigation} />
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    alignItems: "center",
    justifyContent:'center'
  },
  image: {
    width: 30,
    height: 30
  },
  background: {
    flex: 1
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  button: {
    fontSize: 18, 
    marginBottom: 10
  }

})