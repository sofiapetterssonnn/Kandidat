
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
import { Alert,StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";
import { FIRESTORE_DB } from '../../config';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation, useIsFocused } from '@react-navigation/native';

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

  const isFocused = useIsFocused();
  const [rooms, setRooms] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  const navigation = useNavigation()

  const handleLongPress = (index,room) => {
    Alert.alert(room,
    '',
    [
      {
        text: 'Enter room',
      
      },
      {
        text: 'Leave room',
        onPress: () => {
          // Handle "Leave room" button press here
        },
      },])
  
  }
  
  const handlePress = (index) => {
    
    navigation.navigate('Map', { 
      RoomId: index
    });
  }

  useEffect(() => {
    const fetchRooms = async () => {
      const q = query(collection(FIRESTORE_DB, "Rooms"), where("Users", "array-contains", userId));
      const querySnapshot = await getDocs(q);
      const newRooms= [];
    
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        // doc.data() is never undefined for query doc snapshots
 
        newRooms.push(doc.data().Name)
          
      },);
    
      setRooms(newRooms)
    } 
    if(isFocused){
      fetchRooms()
      console.log('Hej')
    }
  }, [userId,isFocused])

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: 'center' }]}>My rooms</Text>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.roomsContainer}>
              {rooms.map((room, index) => (
                  <TouchableOpacity style={styles.roomContainer} key={index} onPress={() => handlePress(index)} onLongPress={() => handleLongPress(index, room)}> 
                    <View style={styles.room}>

                    </View>
                    <Text style={styles.roomText} >{room}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            
        </ScrollView>
      </View>
        <View style={styles.CreateNewButtonContainer}>
          <CreateNewButton/>
        </View>
        

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2156',
    alignItems: 'center',
    paddingTop: 50,
    //paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#B4D6FF',
    marginBottom: 30,
    marginTop: 40
  },
  CreateNewButtonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    right: '5%',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: "60%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20
  },
  buttonText: {
    color: '#1B2156',
    marginLeft: '5%',
    fontSize: 16,
    opacity: 0.8
  },
  scrollContainer:{
   
    height: '60%',
    width: '100%',
   
  },

  roomsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  roomContainer:{
    marginTop: 10,
    margin:10,
    borderTopColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  room: {
    height: 100,
    width:100,
    //backgroundColor: '#FFFFFF',
    margin: '10%',
    borderWidth: 1,
    borderColor: '#B4D6FF',
    borderRadius: 100,

  },
  roomText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: "2%",
    fontWeight: 'bold',
    opacity: 0.8
  }
});