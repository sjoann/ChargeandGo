import React, {useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Button, ImageBackground, Text, FlatList, SafeAreaView} from 'react-native'
import { getDocs, getFirestore, collection, orderBy, query, updateDoc, doc, getDoc, deleteDoc} from 'firebase/firestore/lite'
import NavigationBar from '../components/NavigationBar'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function ForumScreen({ navigation }) {
    const [forum, setForum] = useState(null);
    const [likePressed, setLikePressed] = useState(false)
    const [dislikePressed, setDislikePressed] = useState(false)
   
    const current = firebase.auth().currentUser?.displayName
    const db = getFirestore()
    const colRef = collection(db, "posts")
    
    useEffect(() => {
        getForum();
    }, []);
    
    useEffect(() => {
        getForum();
    }, [likePressed, dislikePressed]);
    
    const getForum = async () => {
    try {
      const list = [];
      const db = getFirestore()
      const colRef = collection(db, "posts")
      const q = query(colRef, orderBy('postTime', 'desc'))
      const querySnapshot = await getDocs(q);        
      querySnapshot.forEach((doc) => {
              const {
                  title,
                  text,
                  postTime,
                  name,
                  likes,
                  likeArr,
                  dislikes,
                  dislikeArr
                } = doc.data();
              list.push({...doc.data(), id: doc.id })
          })
      setForum(list)
    } catch (error) {
      console.log(error);
    }
   }

   const likeActivated =  async (likes, arr, id) => {
       let bool = false
       setLikePressed(true)
       console.log(arr)
       arr.forEach(user => {
           if (user == current) {
               //user has already like before
               bool = true
           }
       })
       if (bool) { 
         //unliking 
          updateDoc(doc(db, "posts", id), {
             likes: likes - 1,
             likeArr: arr.filter(user => user != current)
           }).then(() => {
             setLikePressed(false)
           })
        } else {
         //liking
           updateDoc(doc(db, "posts", id), {
              likes: likes + 1,
              likeArr: arr.concat([current])
           }).then(() => {
              setLikePressed(false)
           });
       }
    }

    const dislikeActivated =  async (dislikes, arr, id) => {
        let bool = false
        setDislikePressed(true)
        console.log(arr)
        arr.forEach(user => {
            if (user == current) {
                //user has already dislike before
                bool = true
            }
        })
        if (bool) { 
          //undoing the dislike
           updateDoc(doc(db, "posts", id), {
              dislikes: dislikes - 1,
              dislikeArr: arr.filter(user => user != current)
            }).then(() => {
              setDislikePressed(false)
            })
         } else {
            //dislike
           
            if (dislikes + 1 > 30) { 
                //too many dislikes hece we will delete the post 
                
                deleteDoc(doc(db, "posts", id)).then(() => {
                    alert("Post is automatically deleted due to the large number of downvotes.")
                    navigation.push('ForumScreen')
                })    
            } else {
                updateDoc(doc(db, "posts", id), {
                    dislikes: dislikes + 1,
                    dislikeArr: arr.concat([current])
                 }).then(() => {
                    setDislikePressed(false)
                 });
            }
        }
     }

   /*const likeActivated =  async (likes, id) => {
      let bool = false
      let arr = []
      const docRef = doc(colRef, id)
      
      await getDoc(docRef)
       .then(doc => {
          arr = doc.data().likeArr
          setLikePressed(true)
       })
       .catch(err => {
         console.log('Error getting document', err);
       });
     
       console.log(arr)
       arr.forEach(user => {
          if (user == current) { 
           //user has already like before
             bool = true
          }
       })
       if (bool) { 
           //unliking 
            updateDoc(doc(db, "posts", id), {
            likes: likes - 1,
            likeArr: arr.filter(user => user != current)
           }).then(() => {
               setLikePressed(false)
          })
       } else {
           //liking
             updateDoc(doc(db, "posts", id), {
             likes: likes + 1,
             likeArr: arr.concat([current])
           }).then(() => {
               setLikePressed(false)
           });
       }
   }*/

    return(
        <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
        </View>
        <FlatList style={styles.list}
        data={forum}
        renderItem={
            ({item}) => 
            <View style={styles.item}>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Text style={styles.text}>
                        {item.text}
                    </Text>
                    <Text style={styles.date}>
                        Posted by {item.name} on {new Date(item.postTime.toDate()).toDateString().substring(4, 15)}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.thumb}>
                            {item.likes}
                        </Text>
                        <TouchableOpacity
                        onPress={() => likeActivated(item.likes, item.likeArr, item.id)}
                        >
                            <FontAwesome size={18} name='thumbs-o-up'/>
                        </TouchableOpacity>
                        <Text style={styles.thumb}>
                            {item.dislikes} 
                        </Text>
                        <TouchableOpacity
                        onPress={() => dislikeActivated(item.dislikes, item.dislikeArr, item.id)}
                        >
                            <FontAwesome name='thumbs-o-down' size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.details}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('CommentScreen', 
                      { paramKey: item.id,
                        paramTitle: item.title, 
                        paramText: item.text, 
                        paramName: item.name, 
                        paramLikes: item.likes,
                        paramDislikes: item.dislikes,
                        paramLikeArr: item.likeArr,
                        paramDislikeArr: item.dislikeArr,
                        paramDate: new Date(item.postTime.toDate()).toDateString().substring(4, 15)})}
                        
                    >
                        <FontAwesome name='comments' size={23} />
                    </TouchableOpacity>
                </View>
            </View>
        }
        />
        <TouchableOpacity
             style={styles.button}
             onPress= {() => navigation.navigate('PostScreen')}>
                 <Text
                 style={styles.buttonText}>
                     Create a new post
                </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <NavigationBar navigation={navigation} />
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
        marginTop: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: '#fcba03',
        padding: 10,
        marginBottom: 10,
        height: 40,
        borderRadius: 10,
        width: 300,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16
    },
    item: {
        borderWidth: 1, 
        borderRadius: 19,
        borderColor: '#525252',
        padding: 13,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    thumb: {
        fontSize: 15,
        marginHorizontal: 4,
        marginTop: 2
    }
    
})