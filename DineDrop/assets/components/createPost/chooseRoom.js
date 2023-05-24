import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

function GoBackButton (props) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.goBackButton} 
            onPress={() => {
            navigation.navigate("Writereview")
            }}
        >
            <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
    );
  }

  function NextButton(props) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.nextButtonText} 
            onPress={() => {
            navigation.navigate("Tabs")
            }}
        >
            <Text style={styles.nextButtonText}>POST</Text>
        </TouchableOpacity>
    );
  }


export default function ChooseRoom() {
   

    return(
        <View style={styles.container}>
        <GoBackButton/>
        <NextButton/>
        
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