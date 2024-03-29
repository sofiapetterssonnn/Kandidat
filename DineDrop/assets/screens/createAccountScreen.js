import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../config';
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile} from 'firebase/auth';

import { AntDesign } from '@expo/vector-icons';


/* useState är en inbyggd funktion i react som används för att skapa tillståndsvariabler i en komponent, vi slkapar firstName, lastName, email, username, password
Varje tillståndsvariabel håller ett värde och kan uppdateras med hjälp av motsvarande funktion som är tilldelad till den, setFristName, setLastName osv 
handleSignUp ska hantera när användaren trycker på "Create Account knappen , loggar detta
, tänker att denna ska användas på nått sätt med databasen?
TextInput - inbyggd komponent i react native, används för att skapa inmatningsfält 
TouchableOpacity - inbyggd komponent i react native, används för att skapa klickbar knapp
styles - använder denna för att få anpassa layouten 
StyleSheet.create - används för att skapa en StyleSheet-objektför att på så vis definiera stylingen för en komponent i react native*/

function GoBackButton (props) {
  const navigation = useNavigation()
  return (

      <TouchableOpacity style={styles.goBackButton} 
          onPress={() => {
          console.log('I am tapped');
          navigation.navigate('Login')
          }}
      >

          <AntDesign name="left" size={30} color="white" />
      </TouchableOpacity>
  );
}

export default function SignUpScreen() {
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(()=>{
    const keyBoardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
        
      }
    )
    const keyBoardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
        
      }
    )
    return () => {
      keyBoardShowListener.remove()
      keyBoardHideListener.remove()
    }

  },[])

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('User is signed in from Create Screen')
        navigation.replace('Tabs')
       
      } else {
        // User is signed out
        // ...
      }
    });
  }, [])
 

  const handleSignUp = () => {
    // PÅ nått vis vill vi skicka den inmatade till DATABAS för att skapa ett konto
    console.log('Skapar konto...');

   
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then(async (userCredential) => {
     
      // Signed in
      const user = userCredential.user;
      console.log('User created with email: ', user.email)
     
      await setDoc(doc(FIRESTORE_DB, "Users", user.uid),{
        firstname: firstName,
        lastname: lastName,
        username: username,
        email: email,
      });
    })
    .then(()=> {
        // Uppdatera auth med display name
      updateProfile(FIREBASE_AUTH.currentUser, {
      displayName: username,
    });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    // ..
    }); 
    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };
  
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      
      <GoBackButton/>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.containerInput}>
        <View style={keyboardVisible? styles.scrollKeyboardContainer:styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
          <ScrollView >
          
            <Text style={styles.label}>First Name:</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setFirstName}
            />

            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setLastName}
            />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput 
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={username}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={
              handleSignUp}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity> 
        
          </ScrollView>
        </View>
      </View>
      </View>
    </TouchableWithoutFeedback>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#1B2156',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#B4D6FF',
    marginBottom: 30,
  },
  label: {
    color: '#B4D6FF',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 10,
    fontSize: 15, 
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    height: 40,
    width: '80%',
    borderRadius: 7,
    marginVertical: 5,
    paddingHorizontal: 1,
    marginLeft: '10%',
    marginBottom: 10,
  
  },
  button: {
    backgroundColor: '#B4D6FF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 100,
    marginTop: 20,
  },
  buttonText: {
    color: '#1B2156',
    fontWeight: 'bold',
    fontSize: 20,
  },
  goBackButton:{
    backgroundColor: 'transparent',
    marginEnd: 300,
    marginBottom: 40,
    marginTop: '20%'
  },
  scrollContainer:{
    //position: 'absolute',
    marginTop: '10%',
    height: '80%',
    width: 350,
   
  },
  scrollKeyboardContainer:{
   // position: 'absolute',
    marginTop: '10%',
    height: '40%',
    width: 350,
   
  },
  containerInput:{
    height:'80%',
    width: 350,
  }
});

