import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../config';
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, getAuth} from 'firebase/auth';


export default function LogInScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const promptForEmail = () =>{
  
    return new Promise((resolve, reject) => {
    Alert.prompt('Email', 'Enter email', [
      {
        text: "Send",
        onPress:(text)=>resolve(text)
        
      },
      {
        text:"Cancel",
        onPress: () => reject(new Error('Credentials input canceled'))
      }
  
     ],)

    })
  
  }

  const handleResetPassword = async () => {
    const email = await promptForEmail()
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent!')
     // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('User is sign in from LogIn Screen')
        navigation.replace('Tabs')
      
      } else {
        // User is signed out

      }
    });
  }, [])


  const handleLogin = () => {
    if (!email || !password) {
      setMessage('Please enter your email and password');
      return;
    }
  
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
   .then((userCredential) => {
   const user = userCredential.user;
   console.log('Signed in as', user.email)
   // ...
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log(errorMessage)
     Alert.alert('Wrong password or email')
   })
   // ..



  };


  const handleSignUp = () => {
    //Navigera till en annan sida för att registrera sig
    console.log('Navigera till registreringssidan');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View>


    <View style={styles.container}>
      <Text style={styles.title}>LOG IN</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
        autoCompleteType="password"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      
      <Text style={styles.message}>{message}</Text>
      <View style={styles.signUp}>
        <Text style={styles.signUpText}>Don't have an accout?</Text>
        
        <TouchableOpacity onPress={() => {
            navigation.navigate('CreateAccount')
        }}>
        <Text style={styles.signUpLink}>Sign up here!</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.resetPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    
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
    fontSize: 36,
    color: '#B4D6FF',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#B4D6FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: '#1B2156',
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    color: 'white',
  },
  signUp: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    color: 'white',
  },
  signUpLink: {
    color: '#B4D6FF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  resetPassword: {
    color: '#B4D6FF',
    marginTop: '5%',
    fontWeight: 'bold',
  },
});