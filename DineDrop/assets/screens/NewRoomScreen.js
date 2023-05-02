import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

/*handleSaveRoom" används för att spara rummet och navigera tillbaka till föregående skärm
"handleSearch" används för att söka efter användare och 
uppdatera "searchResults" med de hittade användarna
FlatList "renderar" ut sökresultaten som hämtades med hjälp av funktionen "handleSearch 
 
 
FlatList är en komponent som används för att visa en lista med data
data-egenskapen är en array med objekt som innehåller information om varje sökresultat
renderItem är en funktion som bestämmer hur varje objekt ska visas i listan
keyExtractor används för att ge varje objekt en unik ID som React kan använda för att hantera uppdateringar av listan mer effektivt*/


export default function NewRoomScreen({ navigation }) {
  const [roomName, setRoomName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSaveRoom = () => {
    // lägg till för att spara rummet
    // (t.ex. skicka data till en API eller en backend-server) 
    // och navigera tillbaka till GroupScreen
    navigation.goBack();
  };

  const handleSearch = () => {
    // lägg till för att söka efter användare
    // t.ex. skicka en förfrågan till en API eller databas
    // och uppdatera searchResults med resultaten
    setSearchResults([
      { id: 1, name: 'Maja' },
      { id: 2, name: 'Vendela' },
      { id: 3, name: 'Sofia' },
      { id: 4, name: 'Minna' },
    ]);
  };

  const renderSearchResult = ({ item }) => {
    return (
      <View style={styles.searchResult}>
        <Text>{item.name}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveRoom}>
        <Text style={styles.buttonText}>Save Room</Text>
      </TouchableOpacity>
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
});