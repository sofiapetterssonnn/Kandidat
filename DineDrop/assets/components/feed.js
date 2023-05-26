import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getDocs, getDoc, query, collection, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../config';
import OnboardingItemPost from '../components/OnboardingItemPost.js';
import PaginatorPost from '../components/paginatorPost.js';



export default function Feed() {
  const auth = getAuth();
  const user = auth.currentUser;
  const isFocused = useIsFocused();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userReviews, setUserReviews] = useState([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);


const [currentIndex, setCurrentIndex] = useState(0)
const scrollx = useRef(new Animated.Value(0)).current;

const viewableItemsChanged = useRef(({viewableItems}) => {
  setCurrentIndex(viewableItems[0].index);
}).current;


const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


 
  useEffect(() => {
    const fetchUser = async () => {

      const docRef = doc(FIRESTORE_DB, 'Users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFirstName(docSnap.data().firstname);
        setLastName(docSnap.data().lastname);
        console.log(firstName, lastName)
      } else {
        console.log('No such document!');
      }
    };

    const fetchUserReviews = async () => {

      const q = query(collection(FIRESTORE_DB, "Reviews"), where("User", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const newReviews = [];

      querySnapshot.forEach((doc) => {

        newReviews.push(doc.data())

      },);
      console.log(newReviews)
      setUserReviews(newReviews)

    };

    if (isFocused) {
      fetchUser();
      fetchUserReviews();
    }
  }, [user.uid, isFocused]);

 
  return (
    <View style={styles.container}>
    <View style={styles.container2}>
        <View style={{flex: 3}}>

          <FlatList
          data={userReviews} 
          /* renderItem={({item}) => <PublishedPost text={item.text} username={item.username} />} */
          renderItem={({item}) => <OnboardingItemPost item= {item}/>}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: {contentOffset: {x:scrollx} } }], { useNativeDriver: false })}
          
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          //ref={slidesRef}
          />
        
        </View>
        <View style={styles.paginatorContainer}>
          <PaginatorPost data={userReviews} scrollx={scrollx}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   marginTop: 150,
    //flex: 1,
    width: '100%',
    height: '70%',
    //backgroundColor: 'red',
    backgroundColor: '#1B2156',
    justifyContent: 'center',
    //alignItems: 'center',
   
  },
  container2: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  paginatorContainer:{
    flex: 0.1,
    marginBottom: 10,
  }
 
});
