import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';

import { FIREBASE_AUTH } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const register = () => {

   const router = useRouter();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [selectedRole, setSelectedRole] = useState();
   
   const auth = FIREBASE_AUTH;

   const signUp = async () => {
      setLoading(true);
      try {
         if (
            !email? alert("Please fill the email ")
            : !password? alert ("Please fill the password ")
            : !selectedRole? alert("Please select role ")
            : true
         ) {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Register successful: ")

            FIREBASE_AUTH.signOut()
            router.push('/screen/login')
         }   
      } catch (error) {
         console.log(error);
         alert("Register failed: " + error.message)
      } finally {
         setLoading(false)
      }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>

      <Stack.Screen
        style={styles.headerTitleStyle}
        options={{
            headerShadowVisible: false,
            headerShown: false,
            headerTitle: 'LOGIN'
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={(text) => {setEmail(text)}}
          style={styles.input}
        />

        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={(text) => {setPassword(text)}}
          style={styles.input}
          secureTextEntry
        />

         <Picker
         selectedValue={selectedRole}
         onValueChange={(itemValue, itemIndex) =>
            setSelectedRole(itemValue)
         }
         mode='dropdown'>
            <Picker.Item label="Role" value="" style={{color:'#808080'}}/>
            <Picker.Item label="Manager" value="manager" />
            <Picker.Item label="Worker" value="worker" />
         </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={signUp}
          style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{router.back()}}>
            <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>    
  )
}

export default register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 1
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  headerTitleStyle:{
    display:"flex",
    flex:1,
    alignSelf:"center",
    textAlign:"center"
  },
})