
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';




function GoBackButton(props) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.goBackButton}
            onPress={() => {
                navigation.navigate("Tabs")
            }}
        >
            <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
    );
}

export default function PostScreen() {
    const [restaurant, setRestaurant] = useState('');
    const [image, setImage] = useState(null);
    const [imageSelected, setImageSelected] = useState(false);
    const route = useRoute();
    const { place, location } = route.params;
    console.log(location)


    const navigation = useNavigation()

    function NextButton() {
        const navigation = useNavigation()
        return (
            <TouchableOpacity style={[styles.nextButtonText, { opacity: imageSelected ? 1 : 0.5 }]}
                onPress={() => {
                    navigation.navigate("Writereview", {
                        place: place,
                        location: location,
                        url: image,

                    })
                    //console.log(image)
                }}
                disabled={!imageSelected} // Inaktivera knappen om ingen bild har valts
            >
                <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
        );
    }

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


        if (!result.canceled) {
            // const { uri } = result;
            setImage(result.assets[0].uri)
            console.log(result.assets[0].uri)
            setImageSelected(true);

        }
    };

    return (
        <View style={styles.container}>
            <NextButton />
            <GoBackButton />
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
                ) : (
                    <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImageSelect}>
                        <MaterialCommunityIcons name="camera-plus" size={40} color="#1B2156" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.changeImageButton} onPress={handleImageSelect}>
                    <Text style={styles.changeImageButtonText}>Change image</Text>
                </TouchableOpacity>

            </View>
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
        marginTop: 60,
    },
    image: {
        width: '100%',
        height: 400,

    },
    imagePlaceholder: {
        width: '100%',
        height: 400,
        marginTop: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#FDCB6E',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#1B2156',
        fontWeight: 'bold'
    },
    mapButtonText: {
        color: '#1B2156',
        fontWeight: 'bold'
    },
    changeImageButton: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonOne: {
        backgroundColor: '#FDCB6E',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        position: 'absolute',
        backgroundColor: 'transparent',
        marginEnd: 20,
        top: 30,
        right: 1,
        zIndex: 2,
    },
    goBackButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        position: 'absolute',
        backgroundColor: 'transparent',
        marginEnd: 20,
        top: 55,
        zIndex: 2,
        left: 20,
    },
    changeImageButtonText: {
        color: 'white',
        fontSize: 16,
        textDecorationLine: 'underline'
    }
});
