

import HomeScreen from './assets/screens/homeScreen.js';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from './assets/screens/logInScreen.js';
import CreateAccountScreen from './assets/screens/createAccountScreen.js';
import MainScreen from './assets/screens/mainScreen.js';

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
          component={LogInScreen} 
        />
        <Stack.Screen 
          name="CreateAccount" 
          component={CreateAccountScreen} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




/*import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './assets/screens/homeScreen.js';
export default function App() {
  return (
  <HomeScreen />
  );
}
}


import { StyleSheet, Text, View } from 'react-native';
import LogInScreen from './assets/screens/logInScreen.js';
export default function App() {
  return (
  <LogInScreen />
  );
}



import { StyleSheet, Text, View } from 'react-native';
import CreateAccountScreen from './assets/screens/createAccountScreen.js';

export default function App() {
  return (
  <CreateAccountScreen />
  );
}
*/