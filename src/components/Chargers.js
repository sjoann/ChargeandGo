import React, { Component, setState } from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  Text, ImageBackground, Dimensions, Image, List, FlatList, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { getDocs, getFirestore, collection} from 'firebase/firestore/lite'
import {getDistance} from 'geolib';
import * as Location from 'expo-location';
import openMap from 'react-native-open-maps';
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


class Chargers extends Component {

    constructor() {
        super();
        this.state = {
            chargersList: [],
            curPosition: {},
            loaded: false,
            sortType: 1,
            refresh: false,
            isModalShown: false
        }
    }

    async componentDidMount() {
        try {
            const chargers = []
            const db = getFirestore()
            const colRef = collection(db, 'chargers')
            getDocs(colRef).then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    chargers.push({...doc.data(), key: doc.id })
                })
                this.setState({chargersList: chargers})
            })
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            this.setState({curPosition: location.coords, loaded:true})
        } catch (error) {
            console.log(error)
        }
    }



    render() {
        const { navigation } = this.props;
        const { chargersList, position } = this.state;
        const chargers = []
        if (this.state.loaded) {
            for (let i = 0; i < this.state.chargersList.length; i++) {
                const object = this.state.chargersList[i]
                const elem = {obj: object, distance:
                    getDistance(
                    {latitude: this.state.curPosition.latitude, longitude: this.state.curPosition.longitude},
                    {latitude: object.location.latitude, longitude:object.location.longitude}
                    ),
                    speed: object.speed,
                    cost: object.cost
                };
                chargers.push(elem);
            }
        }
        
        return(

            <View style={{flex: 1, alignItems: 'center'}}>
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
                </MapView>
                <View style={{position:'absolute', bottom: 0, left: 10}}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('SubmissionScreen');
                        alert("Hold and drag the green marker to the new charger's location!")
                        }}>
                    <Image style={{height: 80, width: 80}} source={require("./pics/add.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.setState({isModalShown: !this.state.isModalShown})}>
                        <Image style={{height:30, width: 30}} source={require("./pics/charger_black.png")}/>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView>

                    <Modal transparent={true} style={{justifyContent: 'flex-end'}} isVisible={this.state.isModalShown} onBackdropPress={()=>this.setState({isModalShown:false})}>
                        <View style={{backgroundColor: "#ffb200", height: 400, borderRadius: 10, marginBottom: 42, width: Dimensions.get('window').width, alignSelf: 'center'}}>

                            <View style={styles.row}>
                                <TouchableOpacity style={styles.rowButtons} onPress={() => this.setState({sortType: 1})}>
                                    <Text>
                                        Distance
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.rowButtons} onPress={() => this.setState({sortType: 2})}>
                                    <Text>
                                        Speed
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.rowButtons} onPress={() => this.setState({sortType: 3})}>
                                    <Text>
                                        Cost
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.setState({isModalShown: false})}>
                                    <Image style={{height: 30, width: 30}} source={require("./pics/quit.png")}/>
                                </TouchableOpacity>

                            </View>

                            { (!this.state.loaded) && (<ActivityIndicator />)}
                            { (this.state.loaded) && (
                            <FlatList 
                                data={       
                                    ((this.state.sortType===1) && chargers.sort((a,b)=>a.distance-b.distance)) ||
                                    ((this.state.sortType===2) && chargers.sort((a,b)=>b.speed-a.speed)) ||
                                    ((this.state.sortType===3) && chargers.sort((a,b)=>a.cost-b.cost))
                                }
                                extraData={this.state.sortType}
                                ItemSeparatorComponent={() => {
                                    return (
                                    <View
                                        style={{
                                        height: 1,
                                        width: "100%",
                                        backgroundColor: "#607D8B",
                                        }}
                                    />
                                    );
                                }}
                                renderItem={
                                    ({item}) => (
                                    <View style={styles.horizontal}>
                                        <View style={styles.body}>                            
                                            <Text style={styles.item}>
                                                {item.obj.name}
                                                {" "}
                                                {item.distance +"m away"
                                            
                                            }
                                            </Text>
                                            <Text>
                                                {item.obj.speed + "kW, " + item.obj.type + ", " + item.obj.cost + "¢/kWh"}
                                            </Text>
                                    
                                        </View>
                                        <TouchableOpacity onPress={() => {navigation.navigate('CommentScreen', 
                                {paramKey: item.obj.identifier, paramTitle: item.obj.name, paramText: item.obj.name + " has been set up!", paramName: item.obj.posterName, paramDate: new Date(item.obj.postTime.toDate()).toDateString().substring(4, 15)});
                                            this.setState({isModalShown: false})}}>
                                            <Image source={require("./pics/messaging_black.png")} style={{height:30,width:30, marginRight: 5}} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {openMap({end:item.obj.location.latitude+", " + item.obj.location.longitude, 
                                        travelType:"drive"
                                        });
                                        this.setState({isModalShown: false});}}>
                                                <Image
                                                source={require("./pics/navigate_icon.png")}
                                                style={{ height: 30, width: 30 }}
                                                />
                                        </TouchableOpacity>
                                    </View>
                                    
                                    
                                    )
                                }
                            
                            />
                            
                            )
                            }
                        </View>

                    </Modal>
                </KeyboardAvoidingView>
                                
            </View>
                
                
            );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        flex: 20
    },
    item: {
        fontSize: 18,
     },
    button: {
        backgroundColor: '#fcba03',
        height: 60,
        width: 60,
        borderRadius: 60,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
        
        
    },
    body: {
        flex: 10
    },
    icon: {
        height: 30,
        width: 30,
    },
    horizontal: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowButtons: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "orange",
        borderColor: 'black',
        borderWidth: 1
    }

})

export default Chargers;