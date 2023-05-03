import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef} from 'react';
import { useNavigation } from '@react-navigation/native';

import OnboardingItem from '../components/OnboardingItem';
import slides from '../components/slides';
import Paginator from  "../components/paginator";




function LogInButton (props) {
    const navigation = useNavigation()
    return (

        <TouchableOpacity style={styles.button} 
            onPress={() => {
            //console.log('I am tapped');
            navigation.navigate('Login')
            }}
        >
            <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
    );
}

export default function HomeScreen(){


const [currentIndex, setCurrentIndex] = useState(0)
const scrollx = useRef(new Animated.Value(0)).current;

const viewableItemsChanged = useRef(({viewableItems}) => {
  setCurrentIndex(viewableItems[0].index);
}).current;

const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (<View style={styles.container}>
      <View style={{ flex: 3}}>

        <FlatList 
          data={slides} 
          renderItem={({item}) => <OnboardingItem item= {item}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {x:scrollx}}}], {
            useNativeDriver: false,
          })}

          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          //ref={slidesRef}
          />
      </View>
        <Paginator data={slides} scrollx={scrollx}/>
        <StatusBar style="auto" />
        <LogInButton label='Log in' />
      </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B2156',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 50,
    },
    button: {
      backgroundColor: '#B4D6FF',
      borderRadius: 20,
      paddingVertical: 20,
      paddingHorizontal: 90,
      marginVertical: 20,
      },
     buttonText: {
        color: '#1B2156',
        fontWeight: 'bold',
        fontSize: 18,
      },
  });