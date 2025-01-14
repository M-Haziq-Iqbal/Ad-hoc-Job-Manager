import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Stack, useRouter, useSearchParams } from "expo-router";

import { addDoc, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../firebase';
import { FirestoreDataFetch } from '..';
import { Formik } from 'formik';
import * as Yup from 'yup'

const ProfileDetails = () => {

    const router = useRouter();
    const { id } = useSearchParams();

    const [loading, setLoading] = useState(false)

    const { dataCollectionRef, object, data, isLoading, error, refetch } = FirestoreDataFetch("employer", id)
    const { employer_email, employer_location, employer_name} = object

    // const SignupSchema = Yup.object().shape({
    //   firstName: Yup.string()
    //     .min(2, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('Required'),
    //   email: Yup.string().email('Invalid email').required('Required'),
    // });

    const signOut = async () => {
        setLoading(true);
        try {
          const response = await FIREBASE_AUTH.signOut();
          console.log(response);
          alert("Sign out successful: ")
          router.push('/screen/login')
        } catch (error) {
          console.log(error);
          alert("Sign out failed: " + error.message)
        } finally {
          setLoading(false)
        }
    }

    const createData = async (values) => {
        try {
            await addDoc(dataCollectionRef, {
                employer_email: FIREBASE_AUTH.currentUser.email,
                id: id,
                employer_name: values.employer_name,
                employer_location: values.employer_location,
            });
            router.push('/user/employer/home/home')

        }catch (error){
            alert('There is an error: ' + error)
        }
    }

    // const deleteData = async (id) => {
    //     const employerDoc = doc(FIRESTORE_DB, "employer", id);
    //     await deleteDoc(employerDoc);
    // };

    const updateData = async (values) => {
        const employerDoc = doc(FIRESTORE_DB, "employer", values.id);
        try {
            await updateDoc(employerDoc, { 
                employer_name: values.employer_name,
                employer_location: values.employer_location
            });

            alert("Your profile information has been succesfully updated!!!")
        } catch (error) {
            alert('There is an error: ' + error)
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
    
            <Stack.Screen
                style={styles.headerTitleStyle}
                options={{
                    headerShadowVisible: false,
                    // headerShown: false,
                    headerTitle: 'PROFILE'
                }}
            />
            
            <View style={styles.loaderContainer}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : error && (
                    <Text>Oops something went wrong ehe</Text>
                )}
            </View>
        
            <Formik 
                initialValues={{
                    id: id,
                    employer_email: employer_email,
                    employer_name: employer_name,
                    employer_location: employer_location
                }}
                // validationSchema={SignupSchema}
                onSubmit={updateData}
                enableReinitialize
            >
                {({values, error, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            value={values.employer_email}
                            onChangeText={handleChange('employer_email')}
                            editable={false}
                        />
            
                        <TextInput
                            style={styles.input}
                            placeholder='Name'
                            value={values.employer_name}
                            onChangeText={handleChange('employer_name')}
                        />
            
                        <TextInput
                            style={styles.input}
                            placeholder='Location'
                            value={values.employer_location}
                            onChangeText={handleChange('employer_location')}
                        />
                    </View>
            
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>

                    
                </View>
                )}
        
            </Formik>
            
            <View style={styles.signOutBtnContainer}>
                <TouchableOpacity
                    onPress={signOut}
                    style={styles.signOutButton}
                >
                    <Text style={styles.buttonText}>SIGN OUT</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>    
    )
}

export default ProfileDetails

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
    signOutBtnContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    button: {
      backgroundColor: '#FF0000',
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
    signOutButton: {
        flex: 1,
        backgroundColor: "#c93030",
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 16,
    },
    headerTitleStyle:{
      display:"flex",
      flex:1,
      alignSelf:"center",
      textAlign:"center"
    },
  })