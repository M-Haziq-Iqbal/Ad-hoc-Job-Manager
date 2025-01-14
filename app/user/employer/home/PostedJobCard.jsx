import { View, Text, TouchableOpacity, Image } from 'react-native'
import { checkImageURL } from '../../../../utils'

const PostedJobCard = ({job, handleNavigate}) => {

  // console.log("job: ",job)
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image 
          source={{ uri: checkImageURL(job.employer_logo) ? job.employer_logo : ('https://img.icons8.com/?size=512&id=6644&format=png') }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{job.job_title}</Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>

      <View style={styles.countContainer}>
        <Text style={styles.appNum} numberOfLines={1}>{job.worker_email.length}</Text>
        <Text style={{fontSize:9}}numberOfLines={1}>APPLICANT</Text>
        {/* <Text style={styles.jobType}>{job.job_employment_type}</Text> */}
      </View>

    </TouchableOpacity>
  )
}

export default PostedJobCard

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
  countContainer: {
    // flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  appNum: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
    alignSelf: 'center'
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});
