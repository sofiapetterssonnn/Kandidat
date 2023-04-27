import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
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
            <Text style={styles.buttonText}>LOG IN</Text>
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
      backgroundColor: '#1B2156',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 50,
    },
    button: {
      backgroundColor: '#B4D6FF',
      borderRadius: 20,
      paddingVertical: 20,
      paddingHorizontal: 90,
      marginVertical: 20,
      },
     buttonText: {
        color: '#1B2156',
        fontWeight: 'bold',
        fontSize: 18,
      },
  });