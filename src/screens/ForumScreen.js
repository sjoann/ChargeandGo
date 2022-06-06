import React, {useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Button, ImageBackground,  TextInput, Text, FlatList, SafeAreaView} from 'react-native'
import BackButton from '../components/BackButton';
import { getDocs, getFirestore, collection, addDoc, orderBy, query, serverTimestamp, querySnapshot} from 'firebase/firestore/lite'

export default function ForumScreen({ navigation }) {
    const [forum, setForum] = useState(null);

    useEffect(() => {
        getForum();
    }, []);
    
    const getForum = async () => {
    try {
      const list = [];
      const db = getFirestore()
      const colRef = collection(db, 'posts')
      const q = query(colRef, orderBy('postTime', 'desc'))
      const querySnapshot = await getDocs(q);        
      querySnapshot.forEach((doc) => {
              const {
                  title,
                  text,
                  postTime
                } = doc.data();
              list.push({...doc.data(), id: doc.id })
          })
      setForum(list);
      console.log('forum: ', forum);
    } catch (error) {
      console.log(error);
    }
  }

    return(
        <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
            <TouchableOpacity
             style={styles.button}
             onPress= {() => navigation.navigate('PostScreen')}>
                 <Text
                 style={styles.buttonText}>
                     Create a new post
                </Text>
            </TouchableOpacity>
        </View>
        <FlatList contentContainerStyle={styles.list}
        data={forum}
        renderItem={
            ({item}) => 
            <View style={styles.item}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <Text style={styles.text}>
                    {item.text}
                </Text>
                <Text style={styles.date}>
                    Posted on {new Date(item.postTime.toDate()).toDateString()}
                </Text>
            </View>
        }
        />
      </SafeAreaView>
      </ImageBackground> 
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    button: {
        backgroundColor: "#ebd234",
        padding: 5,
        marginTop: 5,
        borderRadius: 20
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    item: {
        borderWidth: 1, 
        borderRadius: 19,
        borderColor: '#fff',
        padding: 15,
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    text: {
        padding: 10,
        fontSize: 14,
    },
    date: {
        fontSize: 12
    },
    list: {
        flex: 1,
        padding: 10,
    }

})