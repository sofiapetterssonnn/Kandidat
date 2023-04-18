import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

/* useState är en inbyggd funktion i react som används för att skapa tillståndsvariabler i en komponent, vi slkapar firstName, lastName, email, username, password
Varje tillståndsvariabel håller ett värde och kan uppdateras med hjälp av motsvarande funktion som är tilldelad till den, setFristName, setLastName osv 
handleSignUp ska hantera när användaren trycker på "Create Account knappen , loggar detta
, tänker att denna ska användas på nått sätt med databasen?
TextInput - inbyggd komponent i react native, används för att skapa inmatningsfält 
TouchableOpacity - inbyggd komponent i react native, används för att skapa klickbar knapp
styles - använder denna för att få anpassa layouten 
StyleSheet.create - används för att skapa en StyleSheet-objektför att på så vis definiera stylingen för en komponent i react native*/

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // PÅ nått vis vill vi skicka den inmatade till databas för att skapa ett konto
    console.log('Skapar konto...');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
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
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
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
    backgroundColor: '#DBEDD5',
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
});

