import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../config';
import { getAuth } from 'firebase/auth';
import { query, where, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
/*handleSaveRoom" används för att spara rummet och navigera tillbaka till föregående skärm
"handleSearch" används för att söka efter användare och 
uppdatera "searchResults" med de hittade användarna
FlatList "renderar" ut sökresultaten som hämtades med hjälp av funktionen "handleSearch 
 
 
FlatList är en komponent som används för att visa en lista med data
data-egenskapen är en array med objekt som innehåller information om varje sökresultat
renderItem är en funktion som bestämmer hur varje objekt ska visas i listan
keyExtractor används för att ge varje objekt en unik ID som React kan använda för att hantera uppdateringar av listan mer effektivt*/
const userInitials = [];

const colors = ['#9CDAD2', '#F6C3DC', '#FFEDAC', '#F5CBA4', '#B6BDFF'];

function GoBackButton (props) {
  const navigation = useNavigation()
  return (

      <TouchableOpacity style={styles.goBackButton} 
          onPress={() => {
          console.log('I am tapped');
          navigation.navigate('Tabs')
          }}
      >
          <AntDesign name="left" size={30} color="white" />
      </TouchableOpacity>
  );
}


export default function NewRoomScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [roomName, setRoomName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([user.uid]);
  const [userInitials, setUserInitials] = useState([]);
  const [bgColor, setBgColor] = useState(colors[0]);

  const navigation = useNavigation()

  const changeBgColor = () => {
    const index = Math.floor(Math.random() * colors.length);
    setBgColor(colors[index]);
  };

  const handleSaveRoom = async () => {
    // lägg till för att spara rummet
    console.log('Users saved:', users)
    console.log('Initials saved: ', userInitials)
    if(roomName!=''){
      const docRef = await addDoc(collection(FIRESTORE_DB, "Rooms"), {
        Name: roomName,
        Users: users
      });
      navigation.goBack('Group')  
    }
    else{
      Alert.alert('Enter room name')
    }
      
  };

  const handleSearch = async () => {
    //söka efter användare
  
    const q = query(collection(FIRESTORE_DB, "Users"), where("username", "==", searchTerm));
    const querySnapshot = await getDocs(q);
    const newUser = [];
    const newUserInitials = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     
      if(doc.id == user.uid){
        Alert.alert('Thats you')
      }
      else if(users.includes(doc.id) ){
        Alert.alert('Already added')
      }
      else{
        newUser.push(doc.id)
        newUserInitials.push([doc.data().firstname[0], doc.data().lastname[0]])
        console.log('New user', newUser)
        console.log('New user initials' , newUserInitials)
        changeBgColor() 
        setSearchTerm('')
        
      }
    });
    setUsers(users=>[...users, ...newUser])
    setUserInitials(userInitials=>[...userInitials, ...newUserInitials]);

    
  };


 /*  const renderSearchResult = ({ item }) => {
    return (
      <View style={styles.searchResult}>
        <Text>{item.name}</Text>
      </View>
    );
  };
 */
  return (
    <View style={styles.container}>
      <GoBackButton/>
      <Text style={styles.label}>Room Name:</Text>
      <TextInput
        style={styles.input}
        value={roomName}
        onChangeText={text => setRoomName(text)}
        placeholder="Enter room name"
      />
      <Text style={styles.label}>Invite Friends:</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          placeholder="Search for friends"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    
     {/*  <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={item => item.id.toString()}
      />
       */}
      <View style={styles.initialsContainer}>
        {userInitials.map((item, index) => (
          <View style={[styles.initials, { backgroundColor: bgColor }]} key={index}>
            <Text style={styles.initialsText} >{item[0].toString()}{item[1].toString()}</Text>
          </View>
        ))}
      </View>
      <View style={styles.saveContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveRoom}>
          <Text style={styles.saveButtonText}>Save Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2156',
    padding: 20,
  },
  label: {
    color: '#B4D6FF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  saveContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    right: '5%',
  },
  saveButton: {
    
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B4D6FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
},
  saveButtonText: {
    color: '#1B2156',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#B4D6FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: '#1B2156',
    fontWeight: 'bold',
    fontSize: 16,
  },
  initialsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  initials:{
    //backgroundColor: '#F6C3DC',
    borderRadius: 50,
    width: 50,
    height: 50,
    margin: 20,
  },  
  initialsText:{
    color: '#1B2156',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    lineHeight:50
  },
  goBackButton:{
    backgroundColor: 'transparent',
    marginTop: 50,
    marginBottom: 50,
  },
});