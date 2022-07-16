import React, { Component } from 'react'
import {StyleSheet, Text, View, ActivityIndicator, Dimensions, FlatList, Image, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';
import Modal from "react-native-modal";



export default class TravelTime extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            dataSource: null,
            isModalShown: false,
            cameraChosen: 1,
            filteredSource: null,
            cameras : [{key: 1, name:'Tuas', left: -10, top: 85},{key: 2, name:'KJE', left: 40, top: 35},{key: 3, name:'Woodlands', left: 110, top: 0}
        ,{key: 4, name:'AYE', left: 90, top: 120},{key: 5, name:'BKE', left: 75, top: 80},{key: 6, name:'SLE', left: 115, top: 40},{key: 7, name:'TPE', left: 185, top: 30}
        ,{key: 8, name:'MCE', left: 162, top: 120},{key: 9, name:'CTE', left: 147, top: 80},{key: 10, name:'PIE', left: 245, top: 55},{key: 11, name:'ECP', left: 235, top: 100}]
        }
    }

    
    camera() {
        
        return( 
            this.state.cameras.map((item)=> {
                return <TouchableOpacity onPress={()=>this.setState({isModalShown: true, cameraChosen:item.key})} key={item.key} style={{position:'absolute', marginLeft: item.left, marginTop: item.top, width: 100, height: 70}} hitSlop={{top:-10, bottom:-20, left:-20, right:-20}}>
                <ImageBackground source={require('./pics/bubble.png')} style={styles.bubble}>
                    <View style={styles.text}>
                        <Text style={{fontSize:11, color:'white', fontWeight:'bold'}}>
                            {item.name}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            }
    
            )
        )
    }

    filter() {
        const AreaID = [["4703", "4713", "2701", "2702"],["8701","8704","8706"],
                ["4703","4713","2701","2702"],["4712","4709","4716","4707","4705","4702","4704","4708","4706","4614","4701","4710"],
                    ["2706","2703","2705","2708","2707","2704"],["9701","9706","9705","9703","9704","9702"],
                    ["7795","7796","7798","7797","7793","7794","7791"],["1505","1502","1501","1503","1504"],
                    ["1711","1705","1702","1707","1704","1709","1701","1703","1706"],["6705","5794","6706","6710","6713","6711","5795"],
                    ["3798","3704","3702","3705","3793","3795","3796","3797"]]
        const arr = []
        for (let i = 0; i < this.state.dataSource.length; i++) {
            for (let j = 0; j < AreaID[this.state.cameraChosen - 1].length; j++) {
                if (this.state.dataSource[i]["CameraID"] === AreaID[this.state.cameraChosen - 1][j]) {
                    arr.push(this.state.dataSource[i])
                }
            }
        }
        this.state.filteredSource= arr
    }

    componentDidMount() {
        return fetch('http://datamall2.mytransport.sg/ltaodataservice/Traffic-Imagesv2', {
            method: 'get',
            headers: new Headers({
                'AccountKey' : 'r9H5nEQ/SW2zfU/1pjWQZg=='
            })
        }).then((response) => response.json())
        .then( (responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson.value,
            })
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{alignSelf:'center', justifyContent:'center', textAlign:'center', fontSize:17, fontWeight:'bold'}}>
                        Traffic Cameras
                    </Text>
                    <View style={styles.body}>
                        <Image source={require("./pics/map.png")} style={styles.map}/>
                        {this.camera()}
                    </View>
                    <Modal transparent={true} isVisible={this.state.isModalShown} onBackdropPress={()=>this.setState({isModalShown:false})}>
                        {this.filter()}
                        <View style={styles.modalBackground}>
                            <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{flex: 15, alignSelf:'center', justifyContent:'center', textAlign:'center', fontSize:17, fontWeight:'bold', marginLeft:30}}>
                                    {"Traffic Cameras along " + this.state.cameras[this.state.cameraChosen - 1].name}
                                </Text>
                                <TouchableOpacity style={{alignSelf:'flex-end', marginRight: 10, flex: 1}} onPress={()=>this.setState({isModalShown: false})}>
                                    <Image style={{height: 30, width: 30}} source={require("./pics/quit.png")}/>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                ItemSeparatorComponent={() => {
                                    return (
                                        <View
                                        style={{
                                            height: 1,
                                            width: "100%",
                                            backgroundColor: "black",
                                        }}
                                        />
                                    );
                                }}
                            data={this.state.filteredSource}
                            renderItem={
                                ({item}) => <Image style={{width: 330, height: 220, resizeMode:'contain'}} source={{uri: item.ImageLink}}/>
                            }
                            /> 
                        </View>
                        
                    </Modal>

                </View>
            )
        }
    }

}

const styles = StyleSheet.create({

    box: {
        borderWidth: 1,
        borderColor: "black",
        width: Dimensions.get('window').width - 30,
        height: 300,
        marginBottom: 30,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5
      },
    item: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#474747',
        fontSize: 20
    }, map : {
        width: 340,
        height: 250,
        resizeMode: 'contain'
    }, body : {
        width: 350,
        height: 280
    }, bubble: {
        resizeMode: 'contain',
        width: 105,
        height: 50
    }, text: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 5

    },
    modalBackground: {
        backgroundColor:'#ebae34',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 5
    }
})