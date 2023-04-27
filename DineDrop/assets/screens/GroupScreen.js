import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function GroupScreen(){
    return(
        <View style={styles.container}>
            <Text>Group Screen</Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B2156',
      alignItems: 'center',
      justifyContent: 'center',
    }
});