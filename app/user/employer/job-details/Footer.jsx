import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { useState, useEffect } from 'react'

import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Footer = ({jobId, jobObject, jobRefetch, activeTab, currentEmail}) => {
  
  const [hasEmail, setHasEmail] = useState()

  const email = FIREBASE_AUTH.currentUser.email

  const jobWorkerEmail = jobObject.worker_email

  const containsValue = ()=> {
    if (jobObject.worker_email?.includes(email)){
      (setHasEmail(true))
    } else (setHasEmail(false))
  }

  const jobDoc = doc(FIRESTORE_DB, "jobDetail", jobId);
  
  // const deleteData = async () => {

  //   const filteredEmailArray = (jobObject.worker_email).filter( item => item !== email)
    
  //   try {
  //       await updateDoc(jobDoc, { 
  //         worker_email: filteredEmailArray
  //       });
  //       jobRefetch();
  //       containsValue();
  //       alert("Your job withdrawal is successful!")
  //   } catch (error) {
  //       alert('There is an error: ' + error)
  //   }
  // };

  const updateData = async () => {
    try {
        await updateDoc(jobDoc, { 
          worker_email: [...jobObject.worker_email, FIREBASE_AUTH.currentUser.email]
        });
        jobRefetch();
        containsValue();
        alert("Your job application is successful!")
    } catch (error) {
        alert('There is an error: ' + error)
    }
  };

  useEffect(() => {
    containsValue();
  }, [jobObject.worker_email]);

  // console.log("hasEmail: " + hasEmail)
  // console.log(jobWorkerEmail)
  // console.log(jobObject.worker_email?.includes(FIREBASE_AUTH.currentUser.email))

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity> */}

      {
        (activeTab === "Job") &&
        <TouchableOpacity 
          // onPress={deleteData} 
          style={styles.withdrawBtn}
        >
          <Text style={styles.withdrawBtnText}>
            WITHDRAW
          </Text>
        </TouchableOpacity>
      }
      {
        jobWorkerEmail?.length > 0 && (activeTab === "Worker") && currentEmail &&
        <TouchableOpacity 
        // onPress={updateData} 
        style={styles.applyBtn}
      >
        <Text style={styles.applyBtnText}>
          HIRE
        </Text>
      </TouchableOpacity>
      }
    </View>
  )
}

export default Footer

//Stylesheet
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#F37453",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: "#F37453",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#3ca812",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    marginRight: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
  withdrawBtn: {
    flex: 1,
    backgroundColor: "#c93030",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    marginRight: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  withdrawBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});