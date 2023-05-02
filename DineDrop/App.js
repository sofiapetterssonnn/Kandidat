
import HomeScreen from './assets/screens/homeScreen.js';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from './assets/screens/logInScreen.js';
import CreateAccountScreen from './assets/screens/createAccountScreen.js';
import TabsScreen from './assets/screens/tabsScreen.js';
import GroupScreen from './assets/screens/GroupScreen.js';
import PostScreen from './assets/screens/PostScreen.js';
import ProfileScreen from './assets/screens/profileScreen.js';
import SettingsScreen from './assets/screens/settingsScreen.js';
import NewRoomScreen from './assets/screens/NewRoomScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen options={{headerShown: false}}
          name="Login" 
          component={LogInScreen} 
        />
        <Stack.Screen options={{headerShown: false}}
          name="CreateAccount" 
          component={CreateAccountScreen} 
        />
        <Stack.Screen options={{headerShown: false}}
          name="Tabs" 
          component={TabsScreen} 
        />
        <Stack.Screen options={{headerShown: false}}
         name="Group"
         component={GroupScreen}
       />
       <Stack.Screen options={{headerShown: false}}
         name="Post"
         component={PostScreen}
       />
       <Stack.Screen options={{headerShown: false}}
         name="Profile"
         component={ProfileScreen}
       />

       <Stack.Screen options={{headerShown: false}}
         name="Settings"
         component={SettingsScreen}
       />
       <Stack.Screen name="NewRoom" component={NewRoomScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


/*
import { StyleSheet, Text, View } from 'react-native';
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



import { StyleSheet, Text, View } from 'react-native';
import SettingsScreen from './assets/screens/settingsScreen.js';

export default function App() {
  return (
  <SettingsScreen />
  );
}
*/