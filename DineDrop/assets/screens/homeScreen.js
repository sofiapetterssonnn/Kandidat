import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import LogInScreen from './logInScreen.js';
import { useNavigation } from '@react-navigation/native';




function LogInButton (props) {
    const navigation = useNavigation()
    return (
        
        <TouchableOpacity style={styles.button} 
            onPress={() => {
            //console.log('I am tapped');
            navigation.navigate('Login')
            }}
        >
            <Text>{props.label}</Text>
        </TouchableOpacity>
    );
}

export default function HomeScreen(){

const addDoc = async () => {
  console.log("klickad")
  await setDoc(doc(FIRESTORE_DB, "cities", "AZ"),{
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  }
  );
}

    return (<View style={styles.container}>
        <StatusBar style="auto" />
        <LogInButton label='Log in' />
      </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
      }
  });
