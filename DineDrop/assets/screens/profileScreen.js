import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getDocs, getDoc, query, collection, where } from 'firebase/firestore';
import PublishedPost from '../components/publishedPost.js';
import { FIRESTORE_DB } from '../../config';
import OnboardingItemPost from '../components/OnboardingItemPost.js';
import PaginatorPost from '../components/paginatorPost.js';

function SettingsButton(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <Ionicons style={styles.button} name="ios-settings-outline" size={30} color="#1B2156" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const isFocused = useIsFocused();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userReviews, setUserReviews] = useState([]);
  const [texts, setTexts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  /* const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width; */

  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollx = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  /* const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollx = useRef(new Animated.Value(0)).current;
   */
  //testSTART
  /* const viewableItemsChanged = useRef(({viewableItems}) => {
  setCurrentIndex(viewableItems[0].index);
  }).current; */

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  //testEND

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
      const newText = [];
      const newSliders = [];

      querySnapshot.forEach((doc) => {

        // doc.data() is never undefined for query doc snapshots


        newReviews.push(doc.data())
        newText.push(doc.data().Text)
        newSliders.push(doc.data().Sliders)
        console.log("hej", doc.data())

      },);
      console.log("hallå", newText)
      console.log("tja", newSliders)
      setUserReviews(newReviews)
      setTexts(newText)
      setSliders(newSliders)

    };

    if (isFocused) {
      fetchUser();
      fetchUserReviews();
    }
  }, [user.uid, isFocused]);

  /*  const handleSwipeLeft = () => {
     if (activeReviewIndex < userReviews.length - 1) {
       setActiveReviewIndex(activeReviewIndex + 1);
     }
   };
 
   const handleSwipeRight = () => {
     if (activeReviewIndex > 0) {
       setActiveReviewIndex(activeReviewIndex - 1);
     }
   };
  */
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <SettingsButton />
        <View style={styles.userInformation}>
          <Ionicons style={styles.profileIcon} name="person" size={40} color={'#B4D6FF'} />
          <View>
            <Text style={styles.usernameText}>{user.displayName}</Text>
            <Text style={styles.nameText}>{firstName} {lastName}</Text>
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={{ flex: 3 }}>

          <FlatList
            data={userReviews}
            /* renderItem={({item}) => <PublishedPost text={item.text} username={item.username} />} */
            renderItem={({ item }) => <OnboardingItemPost item={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], { useNativeDriver: false })}

            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
          //ref={slidesRef}
          />

        </View>
        <View style={styles.paginatorContainer}>
          <PaginatorPost data={userReviews} scrollx={scrollx} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2156',
    justifyContent: 'center',
  },
  profileContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '20%',
  },
  profileIcon: {
    marginTop: 20,
    marginLeft: 30,
    width: 40,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 55,
    width: 50,
    marginLeft: 310,

  },
  nameText: {
    color: '#B4D6FF',
    fontWeight: 'bold',
    fontSize: 23,
    paddingTop: 8,
    marginLeft: 20,
  },

  usernameText: {
    color: "#1B2156",
    fontSize: 15,
    paddingTop: 10,
    marginLeft: 20
  },
  userInformation: {
    flexDirection: 'row',
    top: 75,
    width: '55%'
  },
  container2: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  paginatorContainer: {
    flex: 0.6,

  }

});
