import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { addDoc, collection, setDoc, doc, query, where, getDocs} from 'firebase/firestore';
import { FIREBASE_STORAGE } from '../../../config';
import { getStorage, ref, uploadBytes } from 'firebase/storage';


//import { utils } from '@react-native-firebase/app';




import { AntDesign } from '@expo/vector-icons';
import { FIRESTORE_DB } from '../../../config';




export default function ChooseRoom() {
    const route = useRoute();
    const {place,location,text,url,sliders}  = route.params;
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;
    const [roomsName, setRoomsName] = useState([]);
    const [roomsID, setRoomsID] = useState([]);
    const [roomId, setRoomId] = useState([]);

 //   console.log(url)
    const navigation = useNavigation()


function GoBackButton () {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.goBackButton} 
            onPress={() => {
            navigation.navigate("Writereview",{ 
                place:place,
                location: location,
                url: url
              })
            }}
        >
            <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
    );
  }


    const submitPost= async ()=>{
        console.log('hej')
        const filename = url.substring(url.lastIndexOf('/') + 1);
        const storage = getStorage();
        const storageRef = ref(storage, filename);
       
        const response = await fetch(url)
        const blob = await response.blob()
        console.log('Efter')
        try{
            uploadBytes(storageRef, blob)
        .then((snapshot) => {
            console.log('Uploaded an image!');
        }) .catch((error) => {
            console.error('Error uploading image:', error);
         }) 

        }catch(error){console.log(error)}
        
        
      
    }

    useEffect(() => {
        const fetchRooms = async () => {
          const q = query(collection(FIRESTORE_DB, "Rooms"), where("Users", "array-contains", userId));
          const querySnapshot = await getDocs(q);
          const newRoomsName= [];
          const newRoomsID = []
        
          querySnapshot.forEach((doc) => {
           
            // doc.data() is never undefined for query doc snapshots
     
            newRoomsName.push(doc.data().Name)
            newRoomsID.push(doc.id)
              
          },);
        
          setRoomsName(newRoomsName)
          setRoomsID(newRoomsID)
    
        } 
     
          fetchRooms()
          
        
      }, [])

    const handleSavePost = async () => {
      //  await submitPost()

        console.log('save post')
    
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;
        const docRef = await addDoc(collection(FIRESTORE_DB, "Reviews"), {
            Text: text,
            User: userId,
            Picture: url,
            Place: place,
            Sliders: sliders,
            Room: roomId
          
          });

        await setDoc(doc(FIRESTORE_DB, "Places", place),{
            latitude: location[0],
            longitude: location[1],
           
        });
        

          console.log(place)
          navigation.navigate("Tabs")
  
      };

      
      const handlePress = (index) => {
        setRoomId(index)
        console.log(roomId)
     //   handleSavePost(index)
      }
    

    
    return(
        <View style={styles.container}>
        <GoBackButton />
     <TouchableOpacity style={styles.nextButtonText} onPress={handleSavePost}>
            <Text style={styles.nextButtonText}>POST</Text>
     
        </TouchableOpacity> 
        <View style={styles.roomsContainer}>

        
        <Text style={styles.chooseRoomText}>Choose room</Text>
        <View style={styles.scrollContainer}>
        <ScrollView>
              {roomsName.map((room, index) => (
                  <TouchableOpacity style={[styles.roomContainer]} 
                  key={index} onPress={() => handlePress(roomsID[index])} > 
            
                    <Text style={[styles.roomText,
                    roomId === roomsID[index] && styles.selectedRoomText,]} >{room}</Text>
                  </TouchableOpacity>
                ))}
         </ScrollView>
         </View>
         </View>

        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B2156',
        paddingHorizontal: 20,
        paddingVertical: 40,
        paddingTop: 100,
    },
    reviewInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        height: 120,
        textAlignVertical: 'top',
        marginBottom: 20
    },
    goBackButton:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        position: 'absolute',
        backgroundColor: 'transparent',
        marginEnd: 20,
        top: 55,
        left: 20,
    },
    nextButtonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        position: 'absolute',
        backgroundColor: 'transparent',
        marginEnd: 20,
        top: 30,
        right: 1,
      },
    roomsContainer:{
        alignItems: 'center',
   // flexWrap: 'wrap',


    },
   
      roomContainer:{
        marginTop: 10,
        margin:25,
        alignItems: 'center',   
      borderTopColor: 'white',
       
        justifyContent: 'center'
      
        //backgroundColor: 'white'
      },
      room: {
        height: 100,
        width: 100,
        //backgroundColor: '#FFFFFF',
        
        borderWidth: 1,
        borderColor: '#B4D6FF',
        borderRadius: 100,
    
      },
      roomText: {
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: "2%",
        fontWeight: 'bold',

      },
      scrollContainer:{
        marginTop: '20%',
        height: '80%',
      
      },
      chooseRoomText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,

        marginEnd: 20,
        top: 30,
       
      },
      selectedRoomText: {
        color: 'darkgray',
        textDecorationLine: 'underline'

        // Add any other styles you want for the selected room text
      }
})
