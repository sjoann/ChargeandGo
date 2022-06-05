import React, { Component } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Button,  Text, ImageBackground, Dimensions, Image, List, FlatList } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { getDocs, getFirestore, collection, addDoc } from 'firebase/firestore/lite'

function markers(chargers) {
    return( 
        chargers.map((item)=> {
            return <Marker coordinate={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
            }}
            title={item.name}
            description={item.description}
            >
            <Image 
                source={require('../components/pics/charger_cropped.png')}
                style={{width: 40, height: 40}}
                resizeMode="contain"
            />
            </Marker>
        }

        )
    )
}


class SubmitChargers extends Component {

    constructor() {
        super();
        this.state = {
            chargersList: [],
            selectedLatitude: 1.351927,
            selectedLongitude: 103.867081,
            name: '',
            description: '',
            chargerLocation: '',
            chargerType: '',
            chargerCost: '',
            chargerSpeed: ''
        }
    }


    async componentDidMount() {
        const chargers = []
        const db = getFirestore()
        const colRef = collection(db, 'chargers')
        getDocs(colRef).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                chargers.push({...doc.data(), id: doc.id })
            })
            this.setState({chargersList: chargers})
        })
    }

    async submitCharger() {
        const db = getFirestore()
        const colRef = collection(db, 'chargers')
        addDoc(colRef, {
            name: this.state.name + " " + this.state.chargerLocation,
            description: this.state.chargerSpeed + ", " + this.state.chargerType + ", " + this.state.chargerCost,
            location: {
                latitude: this.state.selectedLatitude,
                longitude: this.state.selectedLongitude
            }
        })
    }

    render() {
        const { navigation } = this.props;
        const { chargersList, position } = this.state;
        return(
            <View style={styles.body}>
                <TextInput
                    style = {styles.input}
                    placeholder='Charger Brand (eg: Tesla, SP Power etc)'
                    label="Charger Brand"
                    returnKeyType="done"
                    onChangeText={(text) => this.state.name=text}
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Charger Location (eg: 313 Somerset etc)'
                    label="Charger Location"
                    returnKeyType="done"
                    onChangeText={(text) => this.state.chargerLocation=text}
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Charger Type (eg: Type 2, CCS etc)'
                    label="Charger Type"
                    returnKeyType="done"
                    onChangeText={(text) => this.state.chargerType=text}
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Charging Cost ¢/kWh (eg: 32¢/kWh)'
                    label="Charger Type"
                    returnKeyType="done"
                    onChangeText={(text) => this.state.chargerCost=text}
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Charging Speed kW (eg: 22kW)'
                    label="Charger Speed"
                    returnKeyType="done"
                    onChangeText={(text) => this.state.chargerSpeed=text}
                />
                <Text>
                    Hold and drag the green pin below to select the location
                </Text>
                <MapView 
                provider={"google"}
                initialRegion={{
                    latitude: 1.351927,
                    longitude: 103.867081,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={styles.map}>       
                    {markers(chargersList)}
                    <Marker
                    coordinate={{latitude: 1.351927, longitude: 103.867081}}
                    pinColor="green"
                    draggable={true}
                    onDragEnd={(e) => {
                        this.state.selectedLatitude = e.nativeEvent.coordinate.latitude;
                        this.state.selectedLongitude = e.nativeEvent.coordinate.longitude;
                    }}
                    />
                </MapView>
                <TouchableOpacity style = {styles.submitButton} onPress={()=>{
                    this.submitCharger();
                    alert("You have submitted a new charger.");
                    navigation.navigate('MapScreen');
                    }}>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
                
                
            );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: 300,
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
        backgroundColor: '#fcba03',
        padding: 10,
        marginBottom: 15,
        height: 40,
        borderRadius: 10,
        width: 300,
        marginTop: 20
      }, submitButtonText:{
        color: 'black',
        textAlign: 'center'
    },
    body: {
        alignItems: 'center'
    }
})

export default SubmitChargers;