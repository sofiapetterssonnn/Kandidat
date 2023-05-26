import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

import { AntDesign } from '@expo/vector-icons';



/*   const heart = () => {
    console.log('hej')
    return(
    <AntDesign name="heart" size={24} color="black"/>
    );
  } */


export default function WriteReview() {
    const route = useRoute();
    const { place, location, url } = route.params;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [range1, setRange1] = useState('50%');
    const [isReviewFilled, setIsReviewFilled] = useState(false);
    const [sliding1, setSliding1] = useState('Inactive');

    const [range2, setRange2] = useState('50%');
    const [sliding2, setSliding2] = useState('Inactive');

    const [range3, setRange3] = useState('50%');
    const [sliding3, setSliding3] = useState('Inactive');

    function GoBackButton() {
        const navigation = useNavigation()
        return (
            <TouchableOpacity style={styles.goBackButton}
                onPress={() => {
                    navigation.navigate("Post", {
                        place: place,
                        location: location
                    })
                }}
            >

                <AntDesign name="left" size={30} color="white" />
            </TouchableOpacity>

        );
    }

    function NextButton() {
        const navigation = useNavigation()
        return (
            <TouchableOpacity style={[styles.nextButtonText, { opacity: isReviewFilled ? 1 : 0.5 }]}
                onPress={() => {
                    navigation.navigate("ChooseRoom", {
                        place: place,
                        location: location,
                        text: review,
                        url: url,
                        sliders: [range1, range2, range3]
                    })
                }}
                disabled={!isReviewFilled} // Inaktivera knappen om textrutan är tom
            >
                <Text style={styles.nextButtonText}>NEXT</Text>

            </TouchableOpacity>
        );
    }

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        // Lägg till Kod här för att skicka review till databasen
    };

    return (
        <View style={styles.container}>
            <GoBackButton />
            <NextButton />
            <TextInput
                style={styles.reviewInput}
                placeholder="Write your review..."
                value={review}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => {
                    setReview(text);
                    setIsReviewFilled(text.trim().length > 0);
                }}
                multiline
            />
            {/* <Text style={{fontSize:20, fontWeight: 'bold'}}>{range1}</Text>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>{sliding1}</Text> */}

            <Slider
                style={{ padding: 10, height: 40, marginTop: 50 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor='#B4D6FF'
                maximumTrackTintColor='white'
                thumbTintColor='#B4D6FF'
                value={0.5}
                onValueChange={value => setRange1(parseInt(value * 100) + '%')}
                onSlidingStart={() => setSliding1('Sliding')}
                onSlidingComplete={() => setSliding1('Inactive')}
            />

            {/* <Text style={{fontSize:20, fontWeight: 'bold'}}>{range2}</Text>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>{sliding2}</Text> */}

            <Slider
                style={{ padding: 10, height: 40, marginTop: 50 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor='#B4D6FF'
                maximumTrackTintColor='white'
                thumbTintColor='#B4D6FF'
                value={0.5}
                onValueChange={value => setRange2(parseInt(value * 100) + '%')}
                onSlidingStart={() => setSliding2('Sliding')}
                onSlidingComplete={() => setSliding2('Inactive')}
            />

            {/* <Text style={{fontSize:20, fontWeight: 'bold'}}>{range3}</Text>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>{sliding3}</Text> */}

            <Slider
                style={{ padding: 10, height: 40, marginTop: 50 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor='#B4D6FF'
                maximumTrackTintColor='white'
                thumbTintColor='#B4D6FF'
                value={0.5}
                onValueChange={value => setRange3(parseInt(value * 100) + '%')}
                onSlidingStart={() => setSliding3('Sliding')}
                onSlidingComplete={() => setSliding3('Inactive')}
            />

        </View>

    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B2156',
        paddingHorizontal: 20,
        paddingVertical: 40,
        paddingTop: 100,
    },
    reviewInput: {
        backgroundColor: '#fff',
        padding: 10,
        //borderRadius: 5,
        height: 120,
        textAlignVertical: 'top',
        marginTop: 100,
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
})