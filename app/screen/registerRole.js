import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';

const registerRole = () => {

  const router = useRouter();
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {

    try {
      if (
        !role? alert("Please select role ")
        : true
      ) {
        (role === "employer") ? 
        router.push('/screen/register') :
        router.push('/screen/registerWorker')
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
            headerTitle: 'CHOOSE ROLE'
        }}
      />
      
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue, itemIndex) =>
            setRole(itemValue)
          }
          mode='dropdown'
        >
          <Picker.Item label="Role" value="" style={{color:'#808080'}}/>
          <Picker.Item label="Employer" value="employer" />
          <Picker.Item label="Worker" value="worker" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>    
  )
}

export default registerRole

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '50%'
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