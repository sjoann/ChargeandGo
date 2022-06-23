import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import 'firebase/compat/auth';


export default function NavigationBar({ navigation }) {
    return (
        <View style={styles.rectangleShape}> 

        <TouchableOpacity style={styles.iconButtons}  onPress={() => navigation.push('HomeScreen')} hitSlop={{left: -25, right: -25}}>
          <Image style={styles.icons} source={require("../components/pics/home_grey.png")}  />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButtons}  onPress={() => navigation.push('MapScreen')} hitSlop={{left: -25, right: -25}}>
          <Image style={styles.icons} source={require("../components/pics/charger_grey.png")}  />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButtons}  onPress={() => navigation.push('ForumScreen')} hitSlop={{left: -25, right: -25}}>
          <Image style={styles.icons} source={require("../components/pics/messaging_grey.png")}  />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButtons}  onPress={() => navigation.navigate('ProfileScreen')} hitSlop={{left: -25, right: -25}}>
          <Image style={styles.icons} source={require("../components/pics/user_grey.png")}  />
        </TouchableOpacity>

      </View>
    );
}
const styles = StyleSheet.create({
    rectangleShape: {
        height: 60,
        backgroundColor: '#d4d6d6',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      icons: {
        width: 40,
        height: 40,
      },
      iconButtons: {
        flex:1,
        width: 40,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }
})