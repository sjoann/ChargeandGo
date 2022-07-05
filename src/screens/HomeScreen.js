import React from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  TextInput, ImageBackground, useState, Image, Dimensions } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Text,  Appbar, Provider as PaperProvider } from 'react-native-paper'
import NavigationBar from '../components/NavigationBar'
import RoadIncidents from '../components/RoadIncidents';
import TravelTime from '../components/TravelTime';

export default function HomeScreen({ navigation }) {

    return (
      <View style={styles.background}>
        <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
          <View style= {styles.container}>
            <Text style={styles.header}>
              Welcome Back, {firebase.auth().currentUser?.displayName}
            </Text>

            <Text>
              Traffic Updates from LTA
            </Text>
            <RoadIncidents />
            <Text>
              Some very nice images :)
            </Text>
            <TravelTime />
            
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
  logOutButton: {
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


