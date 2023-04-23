//import * as React from 'react';
//import {Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import GroupScreen from './GroupScreen.js';
import PostScreen from './PostScreen.js';
import ProfileScreen from './ProfileScreen.js';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Group" component={GroupScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Post" component={PostScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}

export default Tabs;
