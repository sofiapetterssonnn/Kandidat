import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getDocs, getDoc, query, collection, where } from 'firebase/firestore';
import PublishedPost from '/Users/majaydreskog/Desktop/Kandidat/Kandidat/DineDrop/assets/components/publishedPost.js';
import { FIRESTORE_DB } from '../../config';

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
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

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

        // doc.data() is never undefined for query doc snapshots

        newReviews.push(doc.data())

      },);

      setUserReviews(newReviews)

    };

    if (isFocused) {
      fetchUser();
      fetchUserReviews();
    }
  }, [user.uid, isFocused]);

  const handleSwipeLeft = () => {
    if (activeReviewIndex < userReviews.length - 1) {
      setActiveReviewIndex(activeReviewIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (activeReviewIndex > 0) {
      setActiveReviewIndex(activeReviewIndex - 1);
    }
  };

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
      <Animated.FlatList
        data={userReviews}
        renderItem={({ item }) => (
          <PublishedPost text={item.text} username={item.username} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
      />
      <TouchableOpacity style={styles.swipeLeftButton} onPress={handleSwipeLeft}>
        <Ionicons name="chevron-back-outline" size={40} color="#1B2156" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.swipeRightButton} onPress={handleSwipeRight}>
        <Ionicons name="chevron-forward-outline" size={40} color="#1B2156" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2156',
  },
  profileContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginBottom: 20,
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    marginLeft: 30,
    width: 45,
    marginTop: 10,
  },
  button: {
    padding: 15,
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 10,
    width: 60,
    marginLeft: 360,
  },
  nameText: {
    color: '#B4D6FF',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 8,
    marginLeft: 20,
  },
  usernameText: {
    color: '#1B2156',
    fontSize: 20,
    paddingTop: 10,
    marginLeft: 20,
  },
  userInformation: {
    flexDirection: 'row',
    top: 40,
    width: '55%',
  },
  reviewList: {
    flexGrow: 1,
  },
  swipeLeftButton: {
    position: 'absolute',
    top: '50%',
    left: 20,
    transform: [{ translateY: -20 }],
  },
  swipeRightButton: {
    position: 'absolute',
    top: '50%',
    right: 20,
    transform: [{ translateY: -20 }],
  },
});