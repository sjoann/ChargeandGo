import React, {useState } from 'react'
import { StyleSheet, TouchableOpacity, Button, ImageBackground,  TextInput, Text, FlatList, SafeAreaView, Dimensions} from 'react-native'
import { getFirestore, collection, addDoc, serverTimestamp,} from 'firebase/firestore/lite'

export default function PostScreen({ navigation }) {
    const [title, setTitle] = useState(null);
    const [text, setText] = useState(null);
    const [postTime, setPostTime] = useState(null);
    const [forum, setForum] = useState(null);
   
    const submitPost = async () => {
        const db = getFirestore()
        const colRef = collection(db, 'posts')
        const docRef = await addDoc(collection(db, 'posts'), {
            title: title,
            text: text,
            postTime: serverTimestamp(),
        })
        .then(() => {
          alert('Your post has been published!')
          setTitle(null)
          setText(null)
          navigation.push('ForumScreen')
        })
        .catch((error) => {
          console.log(error);
        });
    }


    return(
    <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>
                Create a post
            </Text>
            <TextInput 
             style={styles.titleBox}
             placeholder="Title"
             value={title}
             onChangeText={title => setTitle(title)}
             />
             <TextInput 
             style={styles.textBox}
             placeholder="Text"
             multiline
             numberOfLines={4}
             value={text}
             onChangeText={text => setText(text)}
             />
             <TouchableOpacity
             style={styles.button}
             onPress= {submitPost}>
                 <Text
                 style={styles.buttonText}>
                     Submit Post
                </Text>
            </TouchableOpacity>
         </SafeAreaView>
        
    </ImageBackground>
   
    )
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
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30
    },
    titleBox: {
        fontSize: 25,
        marginBottom: 30,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#fff',
        height: 60,
        width: Dimensions.get('window').width - 30,
        padding: 10
        
    },
    textBox: {
        fontSize: 25,
        marginBottom: 50,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#fff',
        height: 90,
        width: Dimensions.get('window').width - 30,
        padding: 10
    },
    button: {
        width: 100,
        backgroundColor: "#ebd234",
        padding: 5,
        marginTop: 5,
        borderRadius: 20
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})