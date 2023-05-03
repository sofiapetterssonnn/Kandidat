import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
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
          //console.log('I am tapped');
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
      displayName: firstName + ' ' + lastName,
    });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    // ..
    }); 
  };


  return (
    <View style={styles.container}>
        <GoBackButton/>
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={
        handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'white',
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
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



  },
});

