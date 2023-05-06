import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FIRESTORE_DB } from '../../config';
import { setDoc, doc } from "firebase/firestore";
import * as Location from 'expo-location';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

export default function MapScreen() {
    const [pin, setPin] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        // Get the user's current location
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
        setPin({ latitude, longitude });
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
        <View style={{  flex: 1 ,  alignItems: 'center'}}>
            <GoBackButton/>
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
            <Marker coordinate={pin} pinColor="red">
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
        top: 40,
        left: 10,
        zIndex:2,
      },
});

    
