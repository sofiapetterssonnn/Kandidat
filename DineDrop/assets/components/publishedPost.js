

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// useState-funktionen för att deklarera tre tillståndsvariabler: imageUrl, review och reviewData. 
//useState returnerar en array som innehåller den aktuella värdetillståndet och en funktion för att uppdatera värdetillståndet. 

const PublishedPost = () => {

    const [imageUrl, setImageUrl] = useState('');
    const [review, setReview] = useState('');
    const [reviewData, setReviewData] = useState([]);

    // useEffect för att hämta data:
    useEffect(() => {
        fetchData();
    }, []);

    //fetchData-funktionen är ansvarig för att hämta data och
    // uppdatera tillståndsvariablerna imageUrl, review och reviewData i komponenten
    const fetchData = () => {
        const fetchedImageUrl =
            'https://parksandresorts.com/assets/uploads/2018/12/5.-mat-dryck-600x400.jpg';
        const fetchedReview = 'God mat, perfekt att ta drinkar och umgås!!! HIHHIH Gillar även musiken som spelades, bra vibe. Passar för dejter osv osv osv !';
        const fetchedReviewData = [
            { id: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZP58kQBcO5fbxvixIrnotTLoT5wi1aCoWQ&usqp=CAU' },
            { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZP58kQBcO5fbxvixIrnotTLoT5wi1aCoWQ&usqp=CAU' },
            { id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZP58kQBcO5fbxvixIrnotTLoT5wi1aCoWQ&usqp=CAU' },
            { id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZP58kQBcO5fbxvixIrnotTLoT5wi1aCoWQ&usqp=CAU' },
            { id: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZP58kQBcO5fbxvixIrnotTLoT5wi1aCoWQ&usqp=CAU' },
        ];

        setImageUrl(fetchedImageUrl);
        setReview(fetchedReview);
        setReviewData(fetchedReviewData);
    };

    const handleEditPress = () => {
        console.log('Redigera recension');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color="#B4D6FF" />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
            </View>

            <View style={styles.reviewContainer}>
                {reviewData.map((item) => (
                    <View key={item.id} style={styles.reviewItem}>
                        <Image source={{ uri: item.image }} style={styles.reviewImage} resizeMode="cover" />
                        <View style={styles.horizontalLine} />
                    </View>
                ))}
                <Text style={styles.reviewText}>{review}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B2156',
    },
    imageContainer: {
        flex: 0.9,
        justifyContent: 'flex',
        alignItems: 'center',
        marginTop: 80,
        backgroundColor: 'black',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    reviewContainer: {
        flex: 1,
        marginBottom: 10,
        padding: 50,
        backgroundColor: '#1B2156',
    },
    reviewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#1B2156'

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
        top: 55,
        right: 5,
        zIndex: 1,
    },
    horizontalLine: {
        flex: 1,
        borderBottomColor: '#B4D6FF',
        borderBottomWidth: 1,
    },
});

export default PublishedPost;

