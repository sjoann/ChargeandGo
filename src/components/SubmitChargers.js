import React, { Component, setState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Button,  Text, ImageBackground, Dimensions, Image, List, FlatList, KeyboardAvoidingView } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { getDocs, getFirestore, collection, addDoc, serverTimestamp, } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Modal from "react-native-modal";

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
            chargerSpeed: null,
            isModalShown: false
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
                <MapView 
                provider={"google"}
                initialRegion={{
                    latitude: 1.351927,
                    longitude: 103.867081,
                    latitudeDelta: 0.12,
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
                        this.setState({isModalShown: true})
                    }}
                    />
                </MapView>
                <View style={{position:'absolute', bottom: 0, left: 10}}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                            navigation.goBack()
                        }}>
                    <Image style={{height: 30, width: 30}} source={require("./pics/backarrow.png")}/>
                    </TouchableOpacity>
                </View>

                <Modal transparent={true} style={{justifyContent: 'flex-end'}} isVisible={this.state.isModalShown} onBackdropPress={()=>this.setState({isModalShown:false})}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={styles.field} >
                            <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{flex: 15, alignSelf:'center', justifyContent:'center', textAlign:'center', fontSize:20, fontWeight:'bold', marginLeft:30}}>
                                    Submit a Charger
                                </Text>
                                <TouchableOpacity style={{alignSelf:'flex-end', marginRight: 10, flex: 1}} onPress={()=>this.setState({isModalShown: false})}>
                                    <Image style={{height: 30, width: 30}} source={require("./pics/quit.png")}/>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style = {styles.input}
                                placeholder='Charger Brand (eg: Tesla, SP Power etc)'
                                placeholderTextColor={"#424242"}
                                label="Charger Brand"
                                returnKeyType="done"
                                onChangeText={(text) => this.state.name=text}
                            />
                            <TextInput
                                style = {styles.input}
                                placeholder='Charger Location (eg: 313 Somerset etc)'
                                placeholderTextColor={"#424242"}
                                label="Charger Location"
                                returnKeyType="done"
                                onChangeText={(text) => this.state.chargerLocation=text}
                            />
                            <TextInput
                                style = {styles.input}
                                placeholder='Charger Type (eg: Type 2, CCS etc)'
                                placeholderTextColor={"#424242"}
                                label="Charger Type"
                                returnKeyType="done"
                                onChangeText={(text) => this.state.chargerType=text}
                            />
                            <TextInput
                                style = {styles.input}
                                placeholder='Charging Cost ¢/kWh (eg: 32¢/kWh)'
                                placeholderTextColor={"#424242"}
                                label="Charger Type"
                                returnKeyType="done"
                                keyboardType='number-pad'
                                onChangeText={(text) => this.state.chargerCost=text}
                            />
                            <TextInput
                                style = {styles.input}
                                placeholder='Charging Speed kW (eg: 22kW)'
                                placeholderTextColor={"#424242"}
                                keyboardType='number-pad'
                                label="Charger Speed"
                                returnKeyType="done"
                                onChangeText={(text) => this.state.chargerSpeed=text}
                            />
                            <TouchableOpacity style = {styles.submitButton} onPress={()=>{
                                this.setState({isModalShown: false})
                                this.submitCharger(navigation);
                                }}>
                                <Text style = {styles.submitButtonText}> Submit </Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>


                </Modal>
            </View>
                
                
            );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        flex: 20
    },
    header: {
        fontSize: 20
    },
    input: {
        margin: 7,
        height: 40,
        width: Dimensions.get('window').width - 40,
        padding: 10,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: '#ff8c00',
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
    },
    field: {
        backgroundColor: "#ffb200",
        height: 400,
        borderRadius: 10,
        marginBottom: 42,
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 30,
        width: 30
    }, button: {
        backgroundColor: '#fcba03',
        height: 60,
        width: 60,
        borderRadius: 60,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
        
        
    },
})

export default SubmitChargers;