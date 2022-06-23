import React from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground,  } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Text,  Appbar, Provider as PaperProvider } from 'react-native-paper'
import NavigationBar from '../components/NavigationBar'

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
            <TouchableOpacity style={styles.button} onPress={logoutUser}>
              <Text>
                Log Out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfileScreen')}>
                <Text>
                    Edit Profile
                </Text>
            </TouchableOpacity>
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
    alignItems: "center"
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
    alignItems: "center",
    backgroundColor: '#fcba03',
    padding: 10,
    marginBottom: 15,
    height: 40,
    borderRadius: 10,
    width: 100,
    alignSelf: 'center'
  }

})