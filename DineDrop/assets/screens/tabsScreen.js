import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import GroupScreen from './GroupScreen.js';
import PostScreen from './PostScreen.js';
import ProfileScreen from './profileScreen.js';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left:20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadious: 15,
                    height: 90,
                }
            }}
         >
            <Tab.Screen name="Group" component={GroupScreen} options={{headerShown: false}} />
            <Tab.Screen name="Post" component={PostScreen} options={{headerShown: false}} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
        </Tab.Navigator>
    );
}

export default Tabs;
