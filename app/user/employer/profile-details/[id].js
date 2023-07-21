// import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
// import { Stack, useRouter, useSearchParams } from "expo-router";

// import { FIRESTORE_DB } from '../../../../firebase';
// import { addDoc, collection } from "firebase/firestore";
// // import { FirestoreDataCreate } from '..';
// import { Formik } from 'formik';
// import * as Yup from 'yup'

// const ProfileDetails = () => {

//     const router = useRouter();
//     const { id } = useSearchParams();
  
//     const data = {
//         job_country: '', 
//         job_description: '', 
//         job_employment_type: '', 
//         job_id: '', 
//         job_title: '',}

//     // const SignupSchema = Yup.object().shape({
//     //   firstName: Yup.string()
//     //     .min(2, 'Too Short!')
//     //     .max(50, 'Too Long!')
//     //     .required('Required'),
//     //   email: Yup.string().email('Invalid email').required('Required'),
//     // });

//     const dataCollectionRef = collection(FIRESTORE_DB, "jobDetail")

//     const createData = async (values) => {
//         try {
//             await addDoc(dataCollectionRef, {
//             job_country: values.job_country,
//             job_description: values.job_description,
//             job_employment_type: values.job_employment_type,
//             job_id: Date.now(),
//             job_title: values.job_title
//             });
//             router.push('/user/employer/home/home')

//             // console.log(filteredData)
//             // console.log("hi")
//         }catch (error){
//             alert('There is an error: ' + error)
//         }
//     }

//     return (
//         <KeyboardAvoidingView style={styles.container}>
    
//         <Stack.Screen
//             style={styles.headerTitleStyle}
//             options={{
//                 headerShadowVisible: false,
//                 headerShown: false,
//                 headerTitle: 'LOGIN'
//             }}
//         />
    
//         <Formik 
//             initialValues={data}
//             // validationSchema={SignupSchema}
//             onSubmit={createData}
//         >
//             {({values, error, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
//             <View style={styles.container}>
//                 <View style={styles.inputContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Type'
//                     value={values.job_country}
//                     onChangeText={handleChange('job_country')}
//                 />
    
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Description'
//                     value={values.job_description}
//                     onChangeText={handleChange('job_description')}
//                 />
    
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Location'
//                     value={values.job_employment_type}
//                     onChangeText={handleChange('job_employment_type')}
//                 />
    
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Duration'
//                     value={values.job_title}
//                     onChangeText={handleChange('job_title')}
//                 />
//                 </View>
    
//                 <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                     onPress={handleSubmit}
//                     style={[styles.button, styles.buttonOutline]}
//                 >
//                     <Text style={styles.buttonOutlineText}>SUBMIT</Text>
//                 </TouchableOpacity>
//                 </View>
//             </View>
//             )}
    
//         </Formik>
//         </KeyboardAvoidingView>    
//     )
// }

// export default ProfileDetails