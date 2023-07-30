import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants';
import { checkImageURL } from '../../../../utils';
import { FirestoreDataFetch } from '..';

const WorkerCard = ({email, currentEmail, setCurrentEmail }) => {

  const { 
    object: currentWorker, 
  } = FirestoreDataFetch("worker", email)

  return (
    
    <TouchableOpacity 
      style={styles.container(email, currentEmail)}
      onPress={()=>setCurrentEmail(email)}
    >
      <TouchableOpacity style={styles.logoContainer(email, currentEmail)}>
        <Image 
          source={{ uri: checkImageURL(currentWorker?.worker_logo) ? currentWorker?.worker_logo : ('https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png') }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      
      <Text style={styles.companyName} >{currentWorker?.worker_name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(email, currentEmail)}>{currentWorker?.worker_email}</Text>
        {/* <Text style={styles.location} numberOfLines={1}>{item.job_country}</Text> */}
      </View>
    </TouchableOpacity>
  )
}

export default WorkerCard

const styles = StyleSheet.create({
  container: (email, currentEmail) => ({
    width: 130,
    padding: SIZES.small,
    backgroundColor: email === currentEmail ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    alignItems: "center",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (email, currentEmail) => ({
    width: 50,
    height: 50,
    backgroundColor: email === currentEmail ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.small,
  },
  jobName: (email, currentEmail) => ({
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: email === currentEmail ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (email) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: email === currentEmail ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});