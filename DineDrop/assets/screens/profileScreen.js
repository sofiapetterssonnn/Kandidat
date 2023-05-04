import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

function SettingsButton (props) {
    const navigation = useNavigation()
    return (
        
        <TouchableOpacity  
            onPress={() => {
            //console.log('I am tapped');
            navigation.navigate('Settings')
            }}
        >
            <Ionicons style={styles.button} name="ios-settings-outline" size={30} color="#1B2156" />
        </TouchableOpacity>
    );
}

export default function ProfileScreen(){

    return(
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                
                    <SettingsButton/>
                    <View style={styles.userInformation}>
                        <Ionicons style={styles.profileIcon} name="person" size={40} color={"#B4D6FF"} />
                        <View>
                            <Text style={styles.usernameText}>Username</Text>
                            <Text style={styles.nameText}>Name Surname</Text>
                        </View>
                    </View>
            
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B2156',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0.99,
    },
    profileContainer:{
        backgroundColor: '#FFFFFF',
        width: '100%',
        //opacity: 0.7,
        marginBottom: 680,
        height:220,
    },
    profileIcon:{
        marginTop:20,
        marginLeft:30,
        width: 40,
        //backgroundColor: 'black',
    },
    button: {
        //backgroundColor: 'black',
        padding: 10,
        marginTop: 80,
       
        width: 50,
        marginLeft:310,
        alignItems: 'center',
      },
      nameText:{
        color: "#B4D6FF",
        fontWeight: 'bold',
        fontSize: 25,
        //backgroundColor: 'black',
        paddingTop: 10,

      },
      usernameText:{
        color: "#1B2156",
        fontSize: 20,

        //backgroundColor: 'red',
      },
      userInformation:{
        flexDirection:'row',
        justifyContent: 'space-between',
        //backgroundColor: 'green',
        width: '70%'
      },
  });
  