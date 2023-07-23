import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';

import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Formik } from 'formik';

const registerWorker = () => {

   const router = useRouter();
   
   const dataCollectionRef = collection(FIRESTORE_DB, "worker")

   const [loading, setLoading] = useState(false);

  //  const auth = FIREBASE_AUTH;

  const createData = async (values) => {
    setLoading(true);
    try {
      if (
        !values.email? alert("Please fill the email ")
        : !values.password? alert ("Please fill the password ")
        : true
      ) {

        await createUserWithEmailAndPassword(FIREBASE_AUTH, values.email, values.password)
        alert("Register successful: ")

        await addDoc(dataCollectionRef, {
          worker_email: FIREBASE_AUTH.currentUser.email,
        });
          
        FIREBASE_AUTH.signOut()
        router.push('/screen/login')
        // console.log(filteredData)
        // console.log("hi")
      }
    }catch (error){
      alert("Ehe Register failed: " + error.message)
    }finally {
      setLoading(false)
    }
  }

  // const signUp = async () => {
  //   setLoading(true);
  //   try {
  //       if (
  //         !email? alert("Please fill the email ")
  //         : !password? alert ("Please fill the password ")
  //         // : !selectedRole? alert("Please select role ")
  //         : true
  //       ) {
  //         await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
  //         alert("Register successful: ")
          
  //         FIREBASE_AUTH.signOut()
  //         router.push('/screen/login')
  //       }   
  //   } catch (error) {
  //       console.log(error);
  //       alert("Register failed: " + error.message)
  //   } finally {
  //       setLoading(false)
  //   }
  // }

  return (
    <KeyboardAvoidingView style={styles.container}>

      <Stack.Screen
        style={styles.headerTitleStyle}
        options={{
            headerShadowVisible: false,
            headerTitle: 'REGISTER AS WORKER'
        }}
      />

      <Formik 
          initialValues={{
              employer_email: "",
          }}
          // validationSchema={SignupSchema}
          onSubmit={createData}
      >
          {({values, error, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  placeholder='Email'
                  value={values.email}
                  onChangeText={handleChange('email')}
              />
  
              <TextInput
                  style={styles.input}
                  placeholder='Password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
              />
              </View>
  
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
          </View>
          )}
  
      </Formik>
    </KeyboardAvoidingView>    
  )
}

export default registerWorker

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