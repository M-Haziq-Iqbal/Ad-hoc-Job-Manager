import { View, Text, TouchableOpacity, Image } from 'react-native'
import { checkImageURL } from '../../../../utils'
import { useState, useEffect } from 'react'

import { FIREBASE_AUTH } from '../../../../firebase'

const AvailableJobCard = ({job, handleNavigate}) => {

  const [hasEmail, setHasEmail] = useState()

  //job is single document from jobDetail collection
  const containsValue = ()=> {
    //check whether current job has current worker email in the document
    if (job.worker_email?.includes(FIREBASE_AUTH.currentUser.email)){
      (setHasEmail(true))
    }
  }
  
  useEffect(() => {
    containsValue();
  }, [job.worker_email]);

  // console.log(job)
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handleNavigate}
    >
  
        <TouchableOpacity style={styles.logoContainer}>
          <Image 
            source={{ uri: checkImageURL(job.employer_logo) ? job.employer_logo : ('https://w7.pngwing.com/pngs/442/477/png-transparent-computer-icons-user-profile-avatar-profile-heroes-profile-user.png') }}
            resizeMode='contain'
            style={styles.logoImage}
          />
        </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{job.job_title}</Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>

      {
        hasEmail&&
        <TouchableOpacity style={styles.logoContainer}>
        <Image 
          source={{ uri: ('https://static.vecteezy.com/system/resources/previews/018/888/319/original/check-mark-icon-png.png') }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      }

    </TouchableOpacity>
    
  )
}

export default AvailableJobCard

//Stylesheet

import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});
