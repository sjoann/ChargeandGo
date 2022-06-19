import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, TextInput, Text, ImageBackground, SafeAreaView, FlatList, Button } from 'react-native'
import { getDocs, getFirestore, collection, addDoc,serverTimestamp, query, where, doc, getDoc} from 'firebase/firestore/lite'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import BackButton from '../components/BackButton';

export default function CommentScreen({ route, navigation }) {
    
    const [comments, setComments] = useState(null);
    const [text, setText] = useState(null);
    const [replied, setReplied] = useState(false)

    useEffect(() => {
        getComments();
    }, []);

    useEffect(() => {
        getComments();
    }, [replied]);

    const getComments = async () => {
        try {
          const list = [];
          const db = getFirestore()
          const colRef = collection(db, 'comments')
          const q = query(colRef, where("identifier", "==", route.params.paramKey));
          const querySnapshot = await getDocs(q);   
          querySnapshot.forEach((doc) => {
                  const {
                      text,
                      postTime,
                      name,
                    } = doc.data();
                  list.push({...doc.data(), id: doc.id })
              })
          setComments(list);
          console.log('comments: ', comments);
          if (list.length == 0) {
            console.log("empty")
        }
        } catch (error) {
          console.log(error);
        }
    }

    const submitComment = async () => {
        if (text == null) {
            alert('Text field cannot be empty')
            return 
        }
        setReplied(true)
        const db = getFirestore()
        const colRef = collection(db, 'comments')
        const docRef = await addDoc(colRef, {
            identifier: route.params.paramKey,
            text: text,
            postTime: serverTimestamp(),
            name: firebase.auth().currentUser?.displayName,
        })
        .then(() => {
          alert('Your comment has been published!')
          setText(null)
          setReplied(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }


    return(
        <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
             <SafeAreaView style={{flex:1}}> 
                <View style={styles.post}>
                    <Text style={styles.title}>
                        {route.params.paramTitle}
                    </Text>
                    <Text style={styles.text}>
                        {route.params.paramText}
                    </Text>
                    <Text style={styles.date}>
                        Posted by {route.params.paramName} on {route.params.paramDate}
                    </Text>
                </View>
                <BackButton goBack={ navigation.goBack }/>
                <TextInput style={{marginLeft: 13}}
                    placeholder="Add a comment..."
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <TouchableOpacity
                    onPress= {submitComment}>
                    <Text style={{marginLeft: 13, fontSize: 12}}>
                        Enter
                    </Text>
                </TouchableOpacity>
                 <FlatList 
                 style={styles.list}
                 data={comments}
                 extraData={replied}
                 renderItem={
                    ({item}) => 
                    <View style={styles.item}>
                        <Text style={styles.text}>
                            {item.text}
                        </Text>
                        <Text style={styles.date}>
                            Posted by {item.name} on {new Date(item.postTime.toDate()).toDateString().substring(4, 15)}
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
    post: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 13,
        marginRight: 13
    },
    item: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        padding: 10,
        marginBottom: 10
    },
    text: {
        padding: 5,
        fontSize: 14,
    },
    date: {
        fontSize: 12
    },
    list: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
})