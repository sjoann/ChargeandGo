import React from 'react'
import { StyleSheet } from 'react-native';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './src/Firebase/config';
import { initializeApp } from 'firebase/app';
import RegisterScreen from './src/screens/RegisterScreen';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import ForumScreen from './src/screens/ForumScreen';
import PostScreen from './src/screens/PostScreen';
import {LogBox} from "react-native";
LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])

const Stack = createStackNavigator()

 firebase.initializeApp(firebaseConfig)
export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen"
        screenOptions={{headerShown: false}}> 
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="ForumScreen" component={ForumScreen} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
