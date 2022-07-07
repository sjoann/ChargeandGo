import React, { Component } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Button,  Text, ImageBackground, Dimensions, Image, List, FlatList } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { getDocs, getFirestore, collection, addDoc, serverTimestamp, } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function markers(chargers) {
    return( 
        chargers.map((item)=> {
            return <Marker coordinate={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
            }}
            key= {item.key}
            title={item.name}
            description={item.speed + "kW, " + item.type + ", " + item.cost + "¢/kWh"}
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
            name: null,
            chargerLocation: null,
            chargerType: null,
            chargerCost: null,
            chargerSpeed: null
        }
    }


    async componentDidMount() {
        const chargers = []
        const db = getFirestore()
        const colRef = collection(db, 'chargers')
        getDocs(colRef).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                chargers.push({key: doc.id, ...doc.data()})
            })
            this.setState({chargersList: chargers})
        })
    }

    async submitCharger(navigation) {
        if (this.state.name == null || this.state.chargerLocation == null ||
            this.state.chargerType == null || this.state.chargerSpeed == null || this.state.chargerCost == null) {
            alert('Field cannot be empty')
            return 
        }
        const db = getFirestore()
        const postRef = collection(db, 'posts')
        await addDoc(postRef, {
            title: this.state.name + " " + this.state.chargerLocation,
            text: this.state.name + " " + this.state.chargerLocation + " has been set up!",
            postTime: serverTimestamp(),
            name: firebase.auth().currentUser?.displayName,
            likes:0,
            dislikes:0,
            likeArr: [],
            dislikeArr: []
        }).then((docRef)=>{
            const colRef = collection(db, 'chargers')
            addDoc(colRef, {
                name: this.state.name + " " + this.state.chargerLocation,
                speed: this.state.chargerSpeed,
                cost: this.state.chargerCost,
                type: this.state.chargerType,
                identifier : docRef.id,
                postTime: serverTimestamp(),
                posterName: firebase.auth().currentUser?.displayName,
                location: {
                    latitude: this.state.selectedLatitude,
                    longitude: this.state.selectedLongitude
                }
            }).then(()=>            
            {
                alert("You have submitted a new charger.");
                navigation.push('MapScreen');
            })
        }
        ).catch((error) =>
            console.log(error)
        );


    }

    render() {
        const { navigation } = this.props;
        const { chargersList, position } = this.state;
        return(
            <View style={styles.body}>
                <Text style={styles.header}>
                    Submit New Charger
                </Text>
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
                    keyboardType='number-pad'
                    onChangeText={(text) => this.state.chargerCost=text}
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Charging Speed kW (eg: 22kW)'
                    keyboardType='number-pad'
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
                    this.submitCharger(navigation);
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
    header: {
        fontSize: 20
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