

import HomeScreen from './assets/screens/homeScreen.js';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from './assets/screens/logInScreen.js';
import CreateAccountScreen from './assets/screens/createAccountScreen.js';
import TabsScreen from './assets/screens/tabsScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen /*options={{headerShown: false}}*/
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen /*options={{headerShown: false}}*/
          name="Login" 
          component={LogInScreen} 
        />
        <Stack.Screen /*options={{headerShown: false}}*/
          name="CreateAccount" 
          component={CreateAccountScreen} 
        />
        <Stack.Screen /*options={{headerShown: false}}*/
          name="Tabs" 
          component={TabsScreen} 
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