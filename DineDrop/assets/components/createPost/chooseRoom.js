import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_STORAGE } from '../../../config';
import { getStorage, ref, uploadBytes } from 'firebase/storage';


//import { utils } from '@react-native-firebase/app';




import { AntDesign } from '@expo/vector-icons';
import { FIRESTORE_DB } from '../../../config';

function GoBackButton (url) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.goBackButton} 
            onPress={() => {
            navigation.navigate("Writereview",{ 
                url: url
              })
            }}
        >
            <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
    );
  }





export default function ChooseRoom() {
    const route = useRoute();
    const {text,url,sliders}  = route.params;
    

    console.log(url)
    const navigation = useNavigation()


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
            Sliders: sliders
    
          });


          navigation.navigate("Tabs")
        
      };
    

    
    return(
        <View style={styles.container}>
        <GoBackButton url = {url}/>
        <TouchableOpacity style={styles.nextButtonText} onPress={handleSavePost}>
            <Text style={styles.nextButtonText}>POST</Text>
        </TouchableOpacity> 

        
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
        zIndex:2,
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
        zIndex:2,
      },
})
