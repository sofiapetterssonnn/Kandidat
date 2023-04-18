import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './assets/screens/homeScreen.js';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import logInScreen from './assets/screens/logInScreen.js';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen 
          name="Login" 
          component={logInScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


