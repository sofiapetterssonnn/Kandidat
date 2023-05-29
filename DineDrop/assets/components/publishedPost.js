
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity , ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

const PublishedPostFeed = ({ item }) => {

    //console.log(item.Sliders)
    const [imageUrl, setImageUrl] = useState('');
    const [review, setReview] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    console.log('Item', item.Sliders)

    // useEffect för att hämta data:
    const [url, setUrl] = useState('');
    const [showImage, setShowImage] = useState(false)

    // useEffect för att hämta data:
     useEffect(() => {
        //  fetchData();
        const storage = getStorage();
        console.log('Här skrivs det ut')
        getDownloadURL(ref(storage, item.Picture))
        .then( (url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url)
            setUrl(url)
            setShowImage(true)
    
           
            
          })
          .catch((error) => {
            // Handle any errors
          });
          
    }, []); 
    

    const fetchData = () => {
        const fetchedImageUrl =
            'https://parksandresorts.com/assets/uploads/2018/12/5.-mat-dryck-600x400.jpg';
        const fetchedReview = 'God mat, perfekt att ta drinkar och umgås!!! HIHHIH Gillar även musiken som spelades, bra vibe. Passar för dejter osv osv osv !';

        setImageUrl(fetchedImageUrl);
        setReview(fetchedReview);
        setIsEditable(false); // Slidersarna blir inte redigerbara när recensionen är hämtad
    };

    const handleEditPress = () => {
        console.log('Redigera recension');
        setIsEditable(true); // Slidersarna blir redigerbara när användaren trycker på redigeringsknappen
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                <MaterialCommunityIcons name="dots-horizontal" size={35} color="#B4D6FF" />
            </TouchableOpacity>

            <View style={styles.placeText}>
                <Text style={styles.ptext}>{item.Place} </Text>
            </View>

            <View style={styles.imageContainer}>
                <ActivityIndicator size="small" color="#B4D6FF" style={styles.loading}/>
                
                 {showImage? ( <Image source={{ uri: url }} style={styles.image} resizeMode="cover" /> ):(<View></View>)} 
            </View> 
        
            <View style={styles.informationContainer}>
                
            <View style={styles.sliders}>
                <View style={styles.sliderHeart}>
                    <Slider
                        style={{ width: 150, height: 40, marginTop: 5 }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor='#B4D6FF'
                        maximumTrackTintColor={isEditable ? 'white' : '#B4D6FF'}
                        thumbTintColor='#B4D6FF'
                        value={item.Sliders[0]}
                        disabled={!isEditable} // Slidersarna blir inaktiverade när recensionen inte är i redigeringsläge
                    />
                    <AntDesign name="heart" size={15} color="#1B2156" />
                    </View>
                    <View style={styles.money}>
                    <Slider
                        style={{ width: 150, height: 40, marginTop: 5 }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor='#B4D6FF'
                        maximumTrackTintColor={isEditable ? 'white' : '#B4D6FF'}
                        thumbTintColor='#B4D6FF'
                        value={item.Sliders[1]}
                        disabled={!isEditable} // Slidersarna blir inaktiverade när recensionen inte är i redigeringsläge
                    />
                    <FontAwesome name="money" size={15} color="#1B2156" />
                    </View>
                    <View style={styles.glass}>
                    <Slider
                        style={{ width: 150, height: 40, marginTop: 5 }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor='#B4D6FF'
                        maximumTrackTintColor={isEditable ? 'white' : '#B4D6FF'}
                        thumbTintColor='#B4D6FF'
                        value={item.Sliders[2]}
                        disabled={!isEditable} // Slidersarna blir inaktiverade när recensionen inte är i redigeringsläge
                    />
                    <FontAwesome5 name="glass-cheers" size={15} color="#1B2156" />

                    </View>

                </View>

                <View style={styles.reviewText}>
                    <Text style={styles.text}>"{item.Text}" </Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
       // zIndex: 2,
        width: '90%',
        backgroundColor: 'white',
        height: '85%',
        marginBottom:20,
        borderRadius: 20,
        
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
       // backgroundColor: '#d9d9d9ff',

    },
    image: {
        zIndex:1,
        width: '100%',
        height: '100%',
    },
    reviewImage: {
        width: 45,
        height: 45,
        marginRight: 10,
        backgroundColor: '#B4D6FF'

    },
    reviewText: {
        color: '#B4D6FF',
        fontSize: 18,
        flex: 1,
        //backgroundColor: 'black',
        padding: 10,
        height: 120,
        marginTop: '5%',
        marginLeft: '5%'
    },
    editButton: {
        position: 'absolute',
        right: 0.5,
        marginRight:10,
        marginTop:4
    },
    horizontalLine: {
        flex: 1,
        borderBottomColor: '#B4D6FF',
        borderBottomWidth: 1,
    },

    placeText: {
        // flex: 1,
        //backgroundColor: '#fff',
        padding: 10,

        marginTop: '3%',
        // marginLeft: '10%',


    },
    ptext: {
        fontSize: 25,
        color: '#1B2156',
        fontWeight: 'bold'
    },
    text: {
        flex: 1,
        color: '#1B2156',
        fontSize: 15,


    },
    sliders: {
        backgroundColor: 'transparent',
        padding: 10

    },
    informationContainer: {
        flexDirection: 'row',

    },


    disabled: {
        color: '#B4D6FF'

    }

});

export default PublishedPostFeed;