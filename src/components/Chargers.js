import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  Text, ImageBackground, Dimensions, Image, List, FlatList} from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { getDocs, getFirestore, collection } from 'firebase/firestore/lite'
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


class Chargers extends Component {

    constructor() {
        super();
        this.state = {
            chargersList: [],
            curPosition: {},
            loaded: false
        }
    }

    async componentDidMount() {
        try {
            const chargers = []
            const db = getFirestore()
            const colRef = collection(db, 'chargers')
            getDocs(colRef).then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    chargers.push({...doc.data(), id: doc.id })
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
                const elem = {obj: this.state.chargersList[i], distance:
                    getDistance(
                    {latitude: this.state.curPosition.latitude, longitude: this.state.curPosition.longitude},
                    {latitude: this.state.chargersList[i].location.latitude, longitude: this.state.chargersList[i].location.longitude}
                    )};
                chargers.push(elem);
            }
            chargers.sort((a,b)=>a.distance-b.distance);
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
                { (this.state.loaded) && (
                <FlatList 
                    data={chargers}
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
                                    {item.obj.description}
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
        marginBottom: 15,
        height: 40,
        borderRadius: 10,
        width: 300,
        marginTop: 20,
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
    }

})

export default Chargers;