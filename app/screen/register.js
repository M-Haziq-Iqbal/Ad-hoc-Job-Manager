import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';

import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Formik } from 'formik';

const register = () => {

  const router = useRouter();
  
  const dataCollectionRef = collection(FIRESTORE_DB, "employer")

  const [loading, setLoading] = useState(false);

  // const updateData = async () => {
  //   const employerDoc = doc(FIRESTORE_DB, "user", "Dobpc1WjOihdEBnKjTFX");
  //   try {
  //       await updateDoc(employerDoc, { 
  //           employer: values.employer_name,
  //       });

  //       alert("Your profile information has been succesfully updated!!!")
  //   } catch (error) {
  //       alert('There is an error: ' + error)
  //   }
  // };

  const createData = async (values) => {
    setLoading(true);
    try {
      if (
        !values.email? alert("Please fill the email ")
        : !values.password? alert ("Please fill the password ")
        : true
      ) {

        await createUserWithEmailAndPassword(FIREBASE_AUTH, values.email, values.password)
        alert("Registration is successful")

        await addDoc(dataCollectionRef, {
          employer_email: FIREBASE_AUTH.currentUser.email,
        });

        // updateData();
          
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

  return (
    <KeyboardAvoidingView style={styles.container}>

      <Stack.Screen
        style={styles.headerTitleStyle}
        options={{
            headerShadowVisible: false,
            headerTitle: 'REGISTER AS EMPLOYER'
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

              {/* <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedRole(itemValue)
                }
                mode='dropdown'
              >
                <Picker.Item label="Role" value="" style={{color:'#808080'}}/>
                <Picker.Item label="Manager" value="manager" />
                <Picker.Item label="Worker" value="worker" />
              </Picker> */}
  
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

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>{router.back()}}>
            <Text>Back</Text>
        </TouchableOpacity>
      </View> */}
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