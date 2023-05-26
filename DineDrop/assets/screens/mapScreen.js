import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Button, TouchableOpacity , TouchableWithoutFeedback, Keyboard} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FIRESTORE_DB } from '../../config';
import { query, collection, getDocs, where, setDoc, doc, getDoc } from 'firebase/firestore';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';


function GoBackButton (props) {
    const navigation = useNavigation()
    return (
  
        <TouchableOpacity style={styles.goBackButton}
            onPress={() => {
            console.log('I am tapped');
            navigation.goBack('Group')
            }}
        >
  
        <AntDesign name="left" size={30} color="white" />

        </TouchableOpacity>
    );
  }

function EditButton (props){
  const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.editButton}
            onPress={() => {
            console.log('I am tapped');
            navigation.goBack('Group')
            }}
        >
  
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="#B4D6FF"/>

        </TouchableOpacity>
    );
}

export default function MapScreen() {
    const [pin, setPin] = useState(null);
    const [region, setRegion] = useState(null);
    const route = useRoute();
    const {RoomId}  = route.params;
    const [Reviews, setReviews] = useState([]);
    const [texts, setText] = useState([]);
    const [sliders, setSliders] = useState([]);
    const [locations, setLocations] = useState([]);
    const [users, setUsers] = useState([]);

    //console.log(locations)
    //console.log(users)

    const fetchLocation = async (place) => {
        const docRef = doc(FIRESTORE_DB, "Places", place);
        const docSnap = await getDoc(docRef);
        const newLocation = []
    
        if (docSnap.exists()) {
            newLocation.push([docSnap.data().latitude, docSnap.data().longitude]);              
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        setLocations(locations=>[...locations, ...newLocation])
    };

    const fetchUsers = async (user) => {
        const docRef = doc(FIRESTORE_DB, "Users", user);
        const docSnap = await getDoc(docRef);
        const newUser = []
    
        if (docSnap.exists()) {
            newUser.push([docSnap.data().firstname, docSnap.data().lastname]);              
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        setUsers(users=>[...users, ...newUser])
    };


    //Get pins from users in room
    useEffect(()=> {
      console.log(RoomId)
      const fetchReviews = async () => {
        
        const q = query(collection(FIRESTORE_DB, "Reviews"), where("Room", "==", RoomId));
        const querySnapshot = await getDocs(q);
        const review = {}
        const newText = [];
        const newSliders = [];


        querySnapshot.forEach(async (doc) => {
            
            const place = doc.data().Place;
            const user = doc.data().User
            newText.push(doc.data().Text);
            newSliders.push(doc.data().Sliders);
            
         
            
            await fetchLocation(place);
            await fetchUsers(user);
            
          
            
            
           // console.log(latitude)
          // doc.data() is never undefined for query doc snapshots
        },);
        setText(newText)
        setSliders(newSliders)

      };
      
      fetchReviews();

      

    },[]);

    //useEffect(()=>{
    //   console.log("ja", sliders)
    //},[sliders])

    // Get the user's current location
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied');
                return;
            }

            const location = await Location.getLastKnownPositionAsync();
            const { latitude, longitude } = location.coords;
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    const handlePlaceSelected = async (data, details) => {
        const { lat: latitude, lng: longitude } = details.geometry.location;
        console.log(latitude,longitude);
        const placeName = details.name;
        //setPin({ latitude, longitude });
        setRegion({ ...region, latitude, longitude });

        await setDoc(doc(FIRESTORE_DB, "Places", placeName),{
            longitude: longitude,
            latitude: latitude,
        });
    };
 

    const handleRemoveMarker = () => {
        console.log("klickat");
        setPin(null);
    };

    const handleCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{  flex: 1 ,  alignItems: 'center'}}>
            <GoBackButton/>
            <EditButton/>
          {region && (
        
        <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              onPress={handlePlaceSelected}
              query={{
                key: 'AIzaSyAAT9kFxe-wsChcOavKovloSDvpKi0SLDA',
                language: 'en',
                components: 'country:se',
                types: 'restaurant|bar|cafe',
                radius: 30000,
                location: `${region.latitude},${region.longitude}`,
              }}
              styles={{
                container: {
                  flex: 0,
                  position: 'absolute',
                  width: '80%',
                  marginTop: "25%",  zIndex: 1,
                },
                listView: { backgroundColor: 'white' },
              }}
            />
          )}
          <MapView style={styles.map} region={region} provider="google">
            {locations.map((location, index) => (
            <Marker 
                key={index} 
                coordinate ={{
                latitude: location[0],
                longitude: location[1],
                }}
                pinColor="red"
            />
            ))}
            <Marker coordinate={pin} pinColor='red'>
              <Callout>
                <Button title="Delete pin" onPress={handleRemoveMarker} />
              </Callout>
            </Marker>
          </MapView>
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={handleCurrentLocation}
          >
            <Text style={styles.currentLocationButtonText}>Current Location</Text>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
      );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
        zIndex: 0,
        
    },
    goBackButton:{
        position: 'absolute',
        backgroundColor: 'transparent',
        marginEnd: 20,
        top: 45,
        left: 10,
        zIndex:2,
      },

    editButton:{
      position: 'absolute',
     // backgroundColor: 'white',
      marginEnd: 20,
      top: 40,
      right: 10,
      zIndex:2,
    }
});

    
