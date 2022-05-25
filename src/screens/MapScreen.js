import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  TextInput, ImageBackground, Dimensions, Image } from 'react-native'
import BackButton from '../components/BackButton';
import Chargers from '../components/Chargers'
import NavigationBar from '../components/NavigationBar'

export default function MapScreen({ navigation }) {

    return(
        <View style={styles.background}>
            <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
                <View style={styles.container}>
                    <BackButton goBack={ navigation.goBack }/>
                    <Chargers />
                </View>
            </ImageBackground>
            <NavigationBar navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1
    },
})