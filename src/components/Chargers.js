import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  Text, ImageBackground, Dimensions, Image, List, FlatList, ActivityIndicator } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { getDocs, getFirestore, collection} from 'firebase/firestore/lite'
import {getDistance} from 'geolib';
import * as Location from 'expo-location';
import openMap from 'react-native-open-maps';

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
            refresh: false
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

            <View>
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
                </MapView>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowButtons} onPress={() => this.setState({sortType: 1})}>
                        <Text>
                            Sort by distance
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowButtons} onPress={() => this.setState({sortType: 2})}>
                        <Text>
                            Sort by speed
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowButtons} onPress={() => this.setState({sortType: 3})}>
                        <Text>
                            Sort by cost
                        </Text>
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
                            <TouchableOpacity onPress={() => openMap({end:item.obj.location.latitude+", " + item.obj.location.longitude, 
                            travelType:"drive"
                            })}>
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
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SubmissionScreen')}>
                    <Text>
                        Found a new charger?
                    </Text>
                </TouchableOpacity>
            </View>
                
                
            );
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: 400,
    },
    item: {
        fontSize: 18,
     },
    button: {
        alignItems: "center",
        backgroundColor: '#fcba03',
        padding: 10,
        marginBottom: 5,
        height: 40,
        borderRadius: 10,
        width: 300,
        marginTop: 5,
        alignSelf: 'center'
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