import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Button,  Text, ImageBackground, Dimensions, Image, List, FlatList } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { getDocs, getFirestore, collection } from 'firebase/firestore/lite'

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
                style={{width: 50, height: 50}}
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
            chargersList: []
        }
    }


    componentDidMount() {
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

    render() {
        const { chargersList } = this.state;

        return(
            <View>
                <MapView 
                initialRegion={{
                    latitude: 1.351927,
                    longitude: 103.867081,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}>       
                    {markers(chargersList)}
                </MapView>
                <FlatList 
                    data={chargersList}
                    renderItem={
                        ({item}) => <Text style={styles.item}>
                            {item.name}
                            {"  "}
                            {item.description}
                        </Text>
                    }
                
                />
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
        padding: 10,
        fontSize: 18,
        height: 44,
    },

})

export default Chargers;