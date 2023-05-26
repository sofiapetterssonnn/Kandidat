
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const PublishedPost = () => {

    const [imageUrl, setImageUrl] = useState('');
    const [review, setReview] = useState('');
    const [isEditable, setIsEditable] = useState(false);


    // useEffect för att hämta data:
    useEffect(() => {
        fetchData();
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

    const [range1, setRange1] = useState('50%');
    const [sliding1, setSliding1] = useState('Inactive');

    const [range2, setRange2] = useState('50%');
    const [sliding2, setSliding2] = useState('Inactive');

    const [range3, setRange3] = useState('50%');
    const [sliding3, setSliding3] = useState('Inactive');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                <MaterialCommunityIcons name="dots-horizontal" size={35} color="#B4D6FF" />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.informationContainer}>
                <View style={styles.sliders}>
                    <Slider
                        style={{ width: 150, height: 40, marginTop: 5 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor='#B4D6FF'
                        maximumTrackTintColor='white'
                        thumbTintColor='#B4D6FF'
                        value={0.5}
                        onValueChange={value => setRange1(parseInt(value * 100) + '%')}
                        onSlidingStart={() => setSliding1('Sliding')}
                        onSlidingComplete={() => setSliding1('Inactive')}
                        disabled={!isEditable} // Slidersarna blir inaktiverade när recensionen inte är i redigeringsläge
                    />

                    <Slider
                        style={{ width: 150, height: 40, marginTop: 5 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor='#B4D6FF'
                        maximumTrackTintColor='white'
                        thumbTintColor='#B4D6FF'
                        value={0.5}
                        onValueChange={value => setRange2(parseInt(value * 100) + '%')}
                        onSlidingStart={() => setSliding2('Sliding')}
                        onSlidingComplete={() => setSliding2('Inactive')}
                        disabled={!isEditable} // Slidersarna blir inaktiverade när recensionen inte är i redigeringsläge
                    />

                    <Slider
                        style={{ width: 150, height: 40, marginTop: 5 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor='#B4D6FF'
                        maximumTrackTintColor='white'
                        thumbTintColor='#B4D6FF'
                        value={0.5}
                        onValueChange={value => setRange3(parseInt(value * 100) + '%')}
                        onSlidingStart={() => setSliding3('Sliding')}
                        onSlidingComplete={() => setSliding3('Inactive')}
                        disabled={!isEditable} // Slidersarna blir inaktiverade när recensionen inte är i redigeringsläge
                    />
                </View>

                <View style={styles.reviewText}>
                    <Text style={styles.text} source={{ review }} />
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: '#1B2156',
        height: '100%',
        marginBottom: 60,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: 'black',
    },
    image: {
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
    },
    editButton: {
        position: 'absolute',
        right: 0.5,
    },
    horizontalLine: {
        flex: 1,
        borderBottomColor: '#B4D6FF',
        borderBottomWidth: 1,
    },
    reviewText: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        height: 120,
        marginTop: 10,


    },
    text: {
        flex: 1,
        color: 'black',
    },
    sliders: {
        backgroundColor: 'transparent',

    },
    informationContainer: {
        flexDirection: 'row',
    }

});

export default PublishedPost;
