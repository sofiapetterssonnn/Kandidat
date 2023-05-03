/*/import React from 'react';
import { Text, View} from 'react-native';

export default function GroupScreen(){
    return(
        <View>
            <Text>Group Screen</Text>
        </View>
        
    );
}
*/

/*
När användaren trycker på knappen för att skapa ett nytt rum anropas funktionen handleCreateNewRoom(), 
som navigerar användaren till en annan skärm som heter NewRoom.
*/

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getAuth } from "firebase/auth";
import { FIRESTORE_DB } from '../../config';
import { query, collection, getDocs, where } from 'firebase/firestore';

const rooms = [];


export default function GroupScreen({ navigation }) {
 
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;

  const fetchRoomsData = async () => {
    const q = query(collection(FIRESTORE_DB, "Rooms"), where("Users", "array-contains", userId));
    const querySnapshot = await getDocs(q);
 
    querySnapshot.forEach((doc) => {
      
      // doc.data() is never undefined for query doc snapshots
      rooms.push(doc.data().Name)

        
    });
    console.log('Rooms', rooms)
  }

  useEffect(() => {
    fetchRoomsData();
  }, [])

  const handleCreateNewRoom = () => {
    navigation.navigate('NewRoom');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCreateNewRoom}>
        <Text style={styles.buttonText}>Create New Room</Text>
      </TouchableOpacity> 
      <Text style={[styles.title, { textAlign: 'center' }]}>My rooms</Text>
        {rooms.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
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
});