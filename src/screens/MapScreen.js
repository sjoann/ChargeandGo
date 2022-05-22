import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  TextInput, ImageBackground, Dimensions, Image } from 'react-native'
import BackButton from '../components/BackButton';
import Chargers from '../components/Chargers'


export default function MapScreen({ navigation }) {

    return(
        <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
            <View style={styles.container}>
                <BackButton goBack={ navigation.goBack }/>
                <Chargers />
            </View>
        </ImageBackground>
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