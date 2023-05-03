import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { signOut, deleteUser } from 'firebase/auth';
import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from '../../config';

import { AntDesign } from '@expo/vector-icons';

/*handleSaveChanges sparar uppdateringarna till databasen, 
handleLogout loggar ut användaren,
handleDeleteAccount raderar kontot (med en bekräftelse från användaren).
TextInputs och Text-komponenter för att visa och redigera användarens information. 
För varje information finns det en Text-komponent med lämplig etikett (label) 
och en TextInput-komponent där användaren kan mata in sin nya information 

TouchableOpacity-komponenter som fungerar som knappar. 
Varje knapp har en annan funktion beroende på vad den heter. 
De är stylade med hjälp av StyleSheet */

function GoBackButton (props) {
  const navigation = useNavigation()
  return (

      <TouchableOpacity style={styles.goBackButton} 
          onPress={() => {
          //console.log('I am tapped');
          navigation.navigate('Tabs')
          }}
      >
          <AntDesign name="left" size={30} color="white" />
      </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const [username, setUsername] = useState(''); /*Kanske inte kunna ändra */
  const [password, setPassword] = useState(''); /*Kanske inte kunna ändra */
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigation = useNavigation()

  const handleSaveChanges = () => {
    // Skicka uppdaterade uppgifterna till DATABASEN!!
    console.log('Sparar ändringar...');
  };

  const handleLogout = () => {
    console.log('Loggar ut...');
    signOut(FIREBASE_AUTH).then(() => {
      console.log('Signed out')
      navigation.replace('Login')
     
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
   
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Radera kontot och logga ut användaren
            console.log('Raderar konto och loggar ut...');
            const user = FIREBASE_AUTH.currentUser;

            //Delete in authentication
            deleteUser(user).then(async () => {

              //Delete in firestore
              await deleteDoc(doc(FIRESTORE_DB, "Users", user.uid));
               navigation.replace('Login')

               // User deleted.
             }).catch((error) => {
               const errorMessage = error.message;
               console.log(errorMessage)
             });

          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <GoBackButton/>
      <Text style={styles.title}>Settings</Text>    
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter new username"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Enter new password"
      />
      <Text style={styles.label}>E-mail</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter new e-mail address"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput 
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter new phone number"
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2156',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#B4D6FF',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: '#B4D6FF',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    },
    button: {
    backgroundColor: '#B4D6FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    },
    buttonText: {
    color: '#1B2156',
    fontWeight: 'bold',
    fontSize: 16,
    },
    deleteButton: {
    backgroundColor: '#B4D6FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    },
    deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    },
    goBackButton:{
      backgroundColor: 'transparent',
      marginEnd: 300,
      marginBottom: 40,
  
  
  
    },
    });