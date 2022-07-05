import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ImageBackground,  } from 'react-native'
import BackButton from '../components/BackButton'
import { Rating, } from 'react-native-ratings';
import { getFirestore, collection, addDoc,} from 'firebase/firestore/lite'

export default function FeedbackScreen({ navigation }) {

    const [text, setText] = useState(null)
    const [rating, setRating] = useState(0)
  
    const ratingCompleted = (rating) => {
      console.log("Rating is: " + rating)
      setRating(rating)
    }

    const submitFeedback = async () => {
      if (text == null) {
        alert('Please let us know how we can improve. Thank you.')
        return 
      }
      const db = getFirestore()
      const colRef = collection(db, 'feedbacks')
      const docRef = await addDoc(colRef, {
        rating: rating,
        text: text
      })
      .then(() => {
         setText(null)
         alert('Thank you for your feedback!')
         navigation.push('ProfileScreen')
      })
      .catch((error) => {
         console.log(error);
      });
    }

    return (
      <View style={styles.background}>
          <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
              <View style= {styles.container}>
                <BackButton goBack={ navigation.goBack }/>
                 <Text style={styles.header}>
                     Give Feedback
                 </Text>
                 <Rating
                 style={styles.rate}
                 showRating
                 onFinishRating={ratingCompleted}
                 />
                 <Text style={styles.text}>
                   Tell us how we can improve
                 </Text>
                 <TextInput
                 style={styles.input}
                 placeholder='Write your message here'
                 onChangeText={(text) => setText(text)}
                 >
                 </TextInput>
                 <TouchableOpacity
                 style={styles.button}
                 onPress= {submitFeedback}>
                    <Text
                     style={styles.buttonText}>
                         Submit
                    </Text>
                 </TouchableOpacity>
              </View>
        </ImageBackground>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        width: '100%',
        alignSelf: 'center',
        alignItems: "center"
    },
      header: {
        fontSize: 24,
        color:  'black',
        fontWeight: 'bold',
        paddingVertical: 12
      },
      background: {
        flex: 1
      },
      text:{
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold'
      },
      input: {
        margin: 7,
        height: 40,
        width: 300,
        padding: 10,
        borderColor: '#525252',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 15
      },
      rate: {
        paddingVertical: 15, 
        backgroundColor: 'white',
        marginVertical: 50
      },
      button: {
        alignItems: "center",
        backgroundColor: '#fcba03',
        padding: 10,
       
        height: 40,
        borderRadius: 10,
        width: 90,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})


