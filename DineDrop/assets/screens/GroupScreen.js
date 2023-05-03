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

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getAuth } from "firebase/auth";
import { FIRESTORE_DB } from '../../config';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

function CreateNewButton (props) {
  const navigation = useNavigation()
  return (

    <TouchableOpacity style={styles.button} onPress={() => {
      //console.log('I am tapped');
      navigation.navigate('NewRoom')
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <AntDesign name="plus" size={20} color="#1B2156" opacity={1}/>
      <Text style={styles.buttonText}>Create New Room</Text>
   
    </View>
    </TouchableOpacity> 
  );
}

// const handleCreateNewRoom = () => {
//   navigation.navigate('NewRoom');
// };

export default function GroupScreen() {
  
  const [rooms, setRooms] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
 
  useEffect(() => {
    const fetchRooms = async () => {
      const q = query(collection(FIRESTORE_DB, "Rooms"), where("Users", "array-contains", userId));
      const querySnapshot = await getDocs(q);
      const newRooms= [];
    
      querySnapshot.forEach((doc) => {
        
        // doc.data() is never undefined for query doc snapshots
 
        newRooms.push(doc.data().Name)
          
      },);
    
      setRooms(newRooms)
    } 
    fetchRooms()
  }, [userId])

  return (
    <View style={styles.container}>
      <CreateNewButton/>
      <Text style={[styles.title, { textAlign: 'center' }]}>My rooms</Text>
      {rooms.map((item, index) => (
        <TouchableOpacity style={styles.room} key={index}>
          <Text style={styles.roomText} >{item}</Text>
        </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: "70%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20
  },
  buttonText: {
    color: '#1B2156',
    marginLeft: '5%',
    fontSize: 16,
    opacity: 0.8
  },
  room: {
    height: "13%",
    width: "90%",
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10
  },
  roomText: {
    color: '#1B2156',
    fontSize: 20,
    marginTop: "5%",
    opacity: 0.8
  }
});