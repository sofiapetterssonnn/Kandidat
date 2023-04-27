import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


function SettingsButton (props) {
    const navigation = useNavigation()
    return (
        
        <TouchableOpacity style={styles.button} 
            onPress={() => {
            //console.log('I am tapped');
            navigation.navigate('Settings')
            }}
        >
            <Text>Settings</Text>
        </TouchableOpacity>
    );
}

export default function ProfileScreen(){
    return(
        <View>
            <SettingsButton/>
            <Text>Profile Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 100,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginVertical: 100,
       
      }
  });
  