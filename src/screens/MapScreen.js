import React from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  TextInput, ImageBackground, Dimensions, Image } from 'react-native'
import { Text } from 'react-native-paper'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function MapScreen() {
    

    return(
    <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
        <View style={styles.container}>
            <MapView initialRegion={{
                latitude: 1.351927,
                longitude: 103.867081,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            style={styles.map}>

                <Marker coordinate={{
                        latitude: 1.380,
                        longitude: 103.867081,
                    }}
                    title="charger #1"
                    description="this is a charger"
                    >
                    <Image 
                        source={require('../components/pics/location_cropped.png')}
                        style={{width: 50, height: 50}}
                        resizeMode="contain"
                    />
                </Marker>
                <Marker coordinate={{
                        latitude: 1.351927,
                        longitude: 103.9,
                    }}
                    title="charger #2"
                    description="this is a charger"
                    >
                    <Image 
                        source={require('../components/pics/location_cropped.png')}
                        style={{width: 50, height: 50}}
                        resizeMode="contain"
                    />
                </Marker>
            </MapView>
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
    screenText:{
        color: '#FFFFFF', 
        fontSize: 30,
        textAlign: 'center'
    },
    background: {
        flex: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: 300,
    }
})