import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { FIRESTORE_DB } from '../../config';
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';

function SettingsButton(props) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        //console.log('I am tapped');
        navigation.navigate('Settings')
      }}
    >
      <Ionicons style={styles.button} name="ios-settings-outline" size={30} color="#1B2156" />
    </TouchableOpacity>
  );
}


export default function ProfileScreen() {

  const auth = getAuth();
  const user = auth.currentUser;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const isFocused = useIsFocused();


  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(FIRESTORE_DB, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setFirstName(docSnap.data().firstname)
        setLastName(docSnap.data().lastname)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    if (isFocused) {
      fetchUser()
    }

  }, [user.uid, isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <SettingsButton />
        <View style={styles.userInformation}>
          <Ionicons style={styles.profileIcon} name="person" size={40} color={"#B4D6FF"} />
          <View>
            <Text style={styles.usernameText}>{user.displayName}</Text>
            <Text style={styles.nameText}>{firstName} {lastName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2156',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0.99,
  },
  profileContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    //opacity: 0.7,
    marginBottom: 680,
    height: '20%',
  },
  profileIcon: {
    marginTop: 20,
    marginLeft: 30,
    width: 40,
    // backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 55,
    width: 50,
    marginLeft: 310,

  },
  nameText: {
    color: "#B4D6FF",
    fontWeight: 'bold',
    fontSize: 25,
    //backgroundColor: 'black',
    paddingTop: 8,
    marginLeft: 20


  },
  usernameText: {
    color: "#1B2156",
    fontSize: 15,
    paddingTop: 10,
    marginLeft: 20
    //backgroundColor: 'red',
  },
  userInformation: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    top: 75,
    width: '55%'
  },
});
