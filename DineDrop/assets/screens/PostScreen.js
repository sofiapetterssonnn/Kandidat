
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function PostScreen() {
    const [restaurant, setRestaurant] = useState('');
    const [image, setImage] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleImageSelect = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            const { uri } = result;
            setImage(uri);
        }
    };

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        // Lägg till Kod här för att skicka review till databasen
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.input}
                    placeholder="Restaurangens namn"
                    value={restaurant}
                    onChangeText={setRestaurant}
                />
            </View>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
                ) : (
                    <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImageSelect}>
                        <MaterialCommunityIcons name="camera-plus" size={40} color="white" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.changeImageButton} onPress={handleImageSelect}>
                    <Text style={styles.changeImageButtonText}>Byt bild</Text>
                </TouchableOpacity>
                <Text style={styles.username}>@username</Text>
            </View>

            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4].map((value) => (
                    <TouchableOpacity
                        key={value}
                        style={[styles.ratingButton, value <= rating && styles.selected]}
                        onPress={() => handleRating(value)}
                    >
                        <Text style={styles.ratingText}>{value}</Text>
                    </TouchableOpacity>
                ))}
                <TextInput
                    style={styles.reviewInput}
                    placeholder="Skriv en recension..."
                    value={review}
                    onChangeText={setReview}
                    multiline
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Skicka recension</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Drop your pin</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B2156',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    header: {
        marginBottom: 20
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 200
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        color: '#fff',
        marginTop: 5
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    ratingButton: {
        backgroundColor: '#B4D6FF',
        borderRadius: 5,
        padding: 10,
        marginRight: 10
    },
    selected: {
        backgroundColor: '#FDCB6E'
    },
    ratingText: {
        color: '#1B2156',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    reviewInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        height: 120,
        textAlignVertical: 'top',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#FDCB6E',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#1B2156',
        fontWeight: 'bold'
    },
    mapButton: {
        backgroundColor: '#B4D6FF',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center'
    },
    mapButtonText: {
        color: '#1B2156',
        fontWeight: 'bold'
    },
    changeImageButton: {
        backgroundColor: '#B4D6FF',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10
    },
    changeImageButtonText: {
        color: '#1B2156',
        fontWeight: 'bold',
    }
});
