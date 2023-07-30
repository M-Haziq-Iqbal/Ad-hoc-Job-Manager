import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';

import { FIREBASE_AUTH, FIREBASE_AUTH_GOOGLE } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FirestoreDataFetch } from '../user/employer/index';

const login = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("")

  // const { object: workerObject } = FirestoreDataFetch("worker", email)
  const { data } = FirestoreDataFetch("employer")

  const signIn = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      alert("Sign in successful: ")

      const filteredObject = data?.filter((obj) => obj?.employer_email === email)
      filteredObject.length === 0? router.push('/user/worker/home/home') : router.push('/user/employer/home/home')
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(FIREBASE_AUTH, FIREBASE_AUTH_GOOGLE);
      alert("Sign in successful: ")
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const enter = (role) => {
      setRole(role)
      router.push(`/user/${role}/home/home`)
  }
  // console.log("user: " + FIREBASE_AUTH?.currentUser?.email)

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

      <TouchableOpacity
          onPress={signInWithGoogle}
          style={styles.input}
        >
          <Text> Sign In With Google </Text>
        </TouchableOpacity>
        
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
      </View>

      <View style={styles.buttonContainer}>

      <TouchableOpacity
          onPress={signIn}
          style={styles.button}
        >
            <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>{router.push('/screen/registerRole')}}
          style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>REGISTER</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={()=>enter("worker")}>
            <Text>Worker</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>enter("employer")}>
            <Text>Employer</Text>
        </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>    
  )
}

export default login

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