import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getDocs, getDoc, query, collection, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../config';
import OnboardingItemFeed from './OnboardingItemFeed';
import PaginatorPost from '../components/paginatorPost.js';



export default function Feed(locRoom) {
  const auth = getAuth();
  const user = auth.currentUser;
  const isFocused = useIsFocused();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userReviews, setUserReviews] = useState([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [place, setPlace]= useState('');
  const [users, setUsers] = useState([]);
  console.log('hej',locRoom)
  


  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollx = useRef(new Animated.Value(0)).current;

  const fetchPlace = async () => {

    const q = query(collection(FIRESTORE_DB, "Places"), where("latitude", "==", locRoom.location[0]), where("longitude", "==", locRoom.location[1]));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id)
      setPlace(doc.id)

    },);
  

  };


  const fetchUsers = async (user) => {
    console.log('Vendi')
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


  const fetchReviews = async () => {
        
    const q = query(collection(FIRESTORE_DB, "Reviews"), where("Room", "==", locRoom.RoomId), where("Place", "==", place));
    const querySnapshot = await getDocs(q);
    const newReviews = [];

    querySnapshot.forEach(async (doc) => {
      //console.log('sofia', doc.data())
      newReviews.push(doc.data())
      await fetchUsers(doc.data().User);
      
       // console.log(latitude)
      // doc.data() is never undefined for query doc snapshots
    },);
    setUserReviews(newReviews)

  };
  
  useEffect( () => {
     fetchPlace()
     fetchReviews();
     
  },[place])
  
const viewableItemsChanged = useRef(({viewableItems}) => {
  setCurrentIndex(viewableItems[0].index);
}).current;

const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={styles.container}>
    <View style={styles.container2}>
        <View style={{flex: 3}}>
          <FlatList
          data={userReviews} 
          /* renderItem={({item}) => <PublishedPost text={item.text} username={item.username} />} */
          renderItem={({item}) => <OnboardingItemFeed item= {item}/>}
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
   //marginTop: 150,
    //flex: 1,
    width: '100%',
    height: '100%',
    //backgroundColor: 'red',
    //backgroundColor: '#1B2156',
    justifyContent: 'center',
    //paddingBottom:30,
    //alignItems: 'center',
   
  },
  container2: {
   // marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  paginatorContainer:{
    
    flex: 0.1,
    marginTop: 19,
  }
 
});
