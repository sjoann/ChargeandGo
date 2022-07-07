import React, {useState}from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground, Modal, Pressable, Dimensions, Image} from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Text, Provider as PaperProvider, TextInput } from 'react-native-paper'
import NavigationBar from '../components/NavigationBar'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { deleteUser } from 'firebase/firestore/lite'

export default function ProfileScreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [reauthenticationVisible, setReauthenticationVisible] = useState(false);
  const [password, setPassword] = useState('')

  const logoutUser = () => {
    try {
      firebase.auth().signOut()
      navigation.navigate('StartScreen')
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async () => {
    // To delete a user, the user must have signed in recently. Re-authentication needed
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email, 
      password
    );
    console.log(credential)
    user.reauthenticateWithCredential(credential).then(result => {
      user.delete().then(() => {
        alert("Account deleted")
        navigation.navigate('StartScreen')
    }).catch((error) => {
      console.log(error)
    });
  }).catch((error) => {
    console.log(error)
    alert("Password is invalid. Try again.")
  });
  }
  

  const modalVisibility = () => {
    setModalVisible(false)
    setReauthenticationVisible(true)
  }

    return (
      <View style={styles.background}>
        <ImageBackground style={styles.background} source={require("../components/pics/background.png")}>
          <View style= {styles.container}>
            <Text style={styles.header}>
              Manage your account
            </Text>
            
            <TouchableOpacity
            onPress={() => navigation.push('EditProfileScreen')}
            >
               <FontAwesome name='user-circle' size={23} />
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.push('EditProfileScreen')}>
                    <Text style={{fontSize:20}}>
                      Edit Profile
                    </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
            onPress={() => navigation.push('FeedbackScreen')}
            >
              <FontAwesome name='flag' size={23} />
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.push('FeedbackScreen')}>
                    <Text style={{fontSize:20}}>
                      Feedback
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={logoutUser}
            >
              <FontAwesome name='power-off' size={23} />
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={logoutUser}>
                    <Text style={{fontSize:20}}>
                      Log Out
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            >
               <FontAwesome name='ban' size={23} color='red' />
            </TouchableOpacity>
           
           <Pressable
           onPress={() => setModalVisible(true)}
           >
            <Text 
             style={{ color: 'red', fontSize: 20 }}>
               Delete Account
            </Text>
          </Pressable>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
           
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                <View style={{flexDirection:'row'}}>
                  <Pressable
                  onPress={() => setModalVisible(false)}
                  >
                    <Text style={{color: 'green', fontSize: 20,  marginHorizontal:19}}>No</Text>
                  </Pressable>
                  <Pressable
                  onPress={() => modalVisibility()}
                  >
                    <Text style={{color: 'red', fontSize: 20,  marginHorizontal:19}}>Yes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
           </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={reauthenticationVisible}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity 
                onPress={()=> setReauthenticationVisible(false)}>
                  <Image 
                  style={{height: 30, width: 30, marginLeft: 350}} 
                  source={require("../components/pics/quit.png")}/>
                </TouchableOpacity>
                <Text style={styles.modalText}>Reauthentication required. Provide your password.</Text>
                <TextInput
                style={styles.box}
                placeholder="Password"
                value={password}
                onChangeText={password => setPassword(password)}
                >
                </TextInput>
                  <Pressable
                  onPress={() => deleteUser()}
                  >
                    <Text style={{color: 'green', fontSize: 20,  marginHorizontal:10}}>Submit</Text>
                  </Pressable>
              </View>
            </View>
           </Modal>



          </View>
        </ImageBackground>
        <NavigationBar navigation={navigation} />
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    alignItems: "center",
    justifyContent:'center'
  },
  image: {
    width: 30,
    height: 30
  },
  background: {
    flex: 1
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  button: {
    fontSize: 18, 
    marginBottom: 20
  },
  delete: {
    fontSize: 18, 
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight:'bold'
  },
  box: {
    fontSize: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#525252',
    height: 44,
    width: Dimensions.get('window').width - 30,
    padding: 10
  }
})