import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LogInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleLogin = () => {
    //KOntrollera användarnamn och lösenord
    if (username === 'user' && password === 'password'){
      setMessage ('Inloggning lyckades!')
    } else{
      setMessage ('Incorrect username or password')
    }
  };


  const handleSignUp = () => {
    //Navigera till en annan sida för att registrera sig
    console.log('Navigera till registreringssidan');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOG IN</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.signUp}>
        <Text style={styles.signUpText}>Don't have an accout?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpLink}>Sign up here!</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
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
    fontSize: 36,
    color: 'white',
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#DBEDD5',
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
    color: '#DBEDD5',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});