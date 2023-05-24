import { Alert,StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword} from "firebase/auth";


function GoBackButton (props) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.goBackButton} 
            onPress={() => {
            //console.log('I am tapped');
            navigation.navigate('Settings')
            }}
        >
            <AntDesign name="left" size={30} color="white"/>
        </TouchableOpacity>
    );
  }



export default function NewPasswordScreen(){
    const [currentPassword, setCurrentPassword] = useState(''); 
    const [newPassword, setnewPassword] = useState(''); 
    const [newPassword2, setnewPassword2] = useState(''); 
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation()
    
    const handleSavePassword = () => {
        
        setCurrentPassword

        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        console.log(credential)
        // TODO(you): prompt the user to re-provide their sign-in credentials
        
        reauthenticateWithCredential(user, credential).then(() => {
          // User re-authenticated.
          if(newPassword.length>=6){
            if(newPassword==newPassword2){
                updatePassword(user, newPassword).then(() => {
                    console.log('uppdaterad')
                    navigation.navigate('Settings')
    
                    // Update successful.
                  }).catch((error) => {
                    // An error ocurred
                    console.log(error.message)
                  });
              }
          }
          else{Alert.alert("Password has to be at least 6 characters")}

        }).catch((error) => {
            console.log(error.message)
          Alert.alert("Wrong current password")
        });
    }


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View style={styles.container}>
        <View style={styles.titleContainer} >
            <GoBackButton/>
            <Text style={styles.title}>Change password</Text>  
        </View>
         
         <Text style={styles.label}>Current password</Text>
        <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Enter current password"
        secureTextEntry={true}
      />
     
         <Text style={styles.label}>New password</Text>
        <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setnewPassword}
        placeholder="Enter new password"
        secureTextEntry={true}
      />
       <Text style={styles.label}>New password</Text>
        <TextInput
        style={styles.input}
        value={newPassword2}
        onChangeText={setnewPassword2}
        placeholder="Enter new password"
        secureTextEntry={true}
      />
         <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
          <Text style={styles.buttonText}>Save password</Text>
        </TouchableOpacity> 

       </View>
       </TouchableWithoutFeedback>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B2156',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    goBackButton:{
        width: 30,
        height: 30,
        position: "absolute",
        right: "80%",
    
        },
    input: {
        backgroundColor: '#FFF',
        marginBottom: 20,
        height: '5%',
        width: '100%',
        borderRadius: 7,
        marginVertical: 10,
        paddingHorizontal: 10,
        color: 'black'
        },
    label: {
        color: '#B4D6FF',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#B4D6FF',
        marginBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#B4D6FF',
       
      },
    titleContainer:{
        marginTop: "5%",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: "15%",
        
    },
    button: {
        backgroundColor: '#B4D6FF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        },
    buttonText: {
        color: '#1B2156',
        fontWeight: 'bold',
        fontSize: 16,
        },
 
})