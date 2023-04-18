import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FIRESTORE_DB } from '../../config';
import { doc, setDoc } from 'firebase/firestore'

export default function homeScreen(){

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
        <Text>Open up App.js to start working on your app!</Text>
        <Button onPress={() => addDoc()} title = "Add Doc"/>
        <StatusBar style="auto" />
      </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });