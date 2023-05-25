import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import { StyleSheet,  Text, View, TouchableOpacity, SafeAreaView  } from 'react-native';




import GroupScreen from './GroupScreen.js';
import DropOnMap from '../components/createPost/dropOnMap.js';
import ProfileScreen from './profileScreen.js';
const Tab = createBottomTabNavigator();


const Tabs = () => {
    return(
    
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#B4D6FF",
                
                tabBarStyle: {

                    color: '#1B2156',

                    position: 'absolute',
                    bottom: 0,
                    left:0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    opacity: 70,
                    height: 90,
                }
            }}
            
         >
            <Tab.Screen name="Group" component={GroupScreen} options={{headerShown: false, tabBarIcon: ({focused, color})=>(<FontAwesome name="group" size={24} color={color} />)}} />
            <Tab.Screen name="DropOnMap" component={DropOnMap} options={{headerShown: false, tabBarIcon: ({focused, color})=>(<Entypo name="location-pin" size={50} color={color} />)}} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false, tabBarIcon: ({focused, color})=>(<Ionicons name="person" size={24} color={color} />)}} />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


export default Tabs;
