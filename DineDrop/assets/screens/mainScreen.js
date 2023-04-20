import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function LogInScreen() {
    const navigation = useNavigation()
    return(
        <Text>Nu är vi på manScreen</Text>
    );
}