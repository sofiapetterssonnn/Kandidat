import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FIREBASE_AUTH } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { signOut, deleteUser } from 'firebase/auth';
import { deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import { FIRESTORE_DB } from '../../config';
import { getAuth, updateProfile, updateEmail,EmailAuthProvider,reauthenticateWithCredential } from "firebase/auth";
import { useEffect, useState } from 'react';


import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

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
          <AntDesign name="left" size={30} color="white"/>
      </TouchableOpacity>
  );
}

function NewPasswordButton (props){
  const navigation = useNavigation()
  return (
      <TouchableOpacity style={styles.newPasswordButton}
          onPress={() => {
          //console.log('I am tapped');
          navigation.navigate('NewPassword')
          }}
      >
        <FontAwesome name="lock" size={24} color="white" />
      </TouchableOpacity>
  );
}


export default function SettingsScreen() {
  const [username, setUsername] = useState(''); 
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState('');
  const [credentialsPassword, setCredentialsPassword] = useState('');
  const [currentFirstname, setCurrentFirstname] = useState('');
  const [currentLastname, setCurrentLastname] = useState('');

  const navigation = useNavigation()

  const auth = getAuth();
  const user = auth.currentUser;
  
  
    
  useEffect(() => {

    setEmail(user.email)
    const fetchUser = async () => {
        const docRef = doc(FIRESTORE_DB, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {

          setUsername(docSnap.data().username)
          setFirstName(docSnap.data().firstname)
          setLastName(docSnap.data().lastname)
          setCurrentFirstname(docSnap.data().firstname)
          setCurrentLastname(docSnap.data().lastname)

        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      fetchUser()
   
  }, [])

  const promptForCredentials = () =>{
  
    return new Promise((resolve, reject) => {
    Alert.prompt('Password', 'Enter password', [
      {
        text: "ok",
        onPress:(text)=>resolve(text)
        
      },
      {
        text:"cancel",
        onPress: () => reject(new Error('Credentials input canceled'))
      }
  
     ],"secure-text")

    })
  
  }

  const handleSaveChanges = async () => {
    
    //Kolla om endast förnamn och efternamn ska uppdateras
    if(email==user.email && username == user.displayName){
      if(currentLastname!==lastName || currentFirstname!==firstName){
        updateDoc(doc(FIRESTORE_DB, "Users", user.uid), {
          firstname: firstName,
          lastname: lastName,
        });
      }
      navigation.goBack("Profile")
    }

    //Kolla om email ska updateras
    if(email!==user.email){
      const password = await promptForCredentials()
      const credential = EmailAuthProvider.credential(user.email, password);
      reauthenticateWithCredential(user, credential).then(() => {
        updateEmail(auth.currentUser, email).then(() => {
          console.log('Email updated!')
          updateDoc(doc(FIRESTORE_DB, "Users", user.uid), {
            email: email,
            firstname: firstName,
            lastname: lastName,
           });
           navigation.goBack("Profile")
        }).catch((error) => {
          // An error occurred
          // ...
        });   
      }).catch((error) => {
        console.log("Kunde in logga in",error.message)
      });
    }
    else{console.log("Samma email")}

    //username
    if(username !== user.displayName){
      updateProfile((user), {
        displayName: username
      }).then(() => {
        updateDoc(doc(FIRESTORE_DB, "Users", user.uid), {
          username: username,
          firstname: firstName,
          lastname: lastName
        });
        console.log(user)
        navigation.goBack("Profile")

      }).catch((error) => {
        console.log("fel i uppdatering av username", error.message)
      });
    }
    else{console.log("Same username")}
  };

  

  const handleLogout = () => {

    Alert.alert(
      'Log out', '',
      [
        {
          text: 'Cancel',
          style: 'Cancel'
        },
        {
          text: 'Log out',
          onPress: () => {
            console.log('Loggar ut...');
            signOut(FIREBASE_AUTH).then(() => {
              console.log('Signed out')
              navigation.replace('Home')
             
              // Sign-out successful.
            }).catch((error) => {
              // An error happened.
            });
           
           
          },
          style: 'destructive',
      
        }
      ]
   )
   
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
          onPress: async () => {
            const password = await promptForCredentials()
            const credential = EmailAuthProvider.credential(user.email, password);
            reauthenticateWithCredential(user, credential).then(() => {
              // Radera kontot och logga ut användaren
              console.log('Raderar konto och loggar ut...');
              const user = FIREBASE_AUTH.currentUser;
              
              //Delete in authentication
              deleteDoc(doc(FIRESTORE_DB, "Users", user.uid)).then(async () => {

                //Delete in firestore
                await deleteUser(user)
                navigation.replace('Home')

                // User deleted.
              }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
              });
            }).catch((error) => {
              console.log("Kunde in logga in",error.message)
            });
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      
      <View style={styles.titleContainer} >
        <GoBackButton/>
        <Text style={styles.title}>Settings</Text>  
        <NewPasswordButton/>
      </View>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter new username"
      />
      
      <Text style={styles.label}>E-mail</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter new e-mail address"
      />

      <Text style={styles.label}>First name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder=""
      />
      <Text style={styles.label}>Last name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder=""
      />
       <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity> 

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logOutButtonText}>Log out</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity> 
      </View>
    </View>
    </TouchableWithoutFeedback>
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
  titleContainer:{
    marginTop: "5%",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#B4D6FF',
  },
  label: {
    color: '#B4D6FF',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#B4D6FF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    height: '5%',
    width: '100%',
    borderRadius: 7,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: 'black'
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
  logOutButtonText:{
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
 
  deleteButtonText: {
    color: '#F14A4A',
    fontSize: 16,
    marginTop: 20
    },
  newPasswordButton:{
    paddingTop: 3,
    position: "absolute",
    left: "57%",
  },
  goBackButton:{
    width: 30,
    height: 30,
    position: "absolute",
    right: "55%",

    },
  buttonContainer:{
    position: 'absolute',
    bottom: '6%',
    alignItems: 'center',
    //backgroundColor: 'white'
  }
    });