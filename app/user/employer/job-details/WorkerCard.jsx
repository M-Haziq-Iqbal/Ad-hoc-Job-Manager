import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants';
import { checkImageURL } from '../../../../utils';

const WorkerCard = ({email, handlePress, currentWorker}) => {

  console.log("currentWorker: ",currentWorker)
  return (
    
    <TouchableOpacity 
      style={styles.container(email, currentWorker)}
      onPress={()=>handlePress(email)}
    >
      <TouchableOpacity style={styles.logoContainer(email, currentWorker)}>
        <Image 
          source={{ uri: checkImageURL(currentWorker?.worker_logo) ? currentWorker?.worker_logo : ('https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png') }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      

      <Text style={styles.companyName} >{currentWorker?.worker_name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(email, currentWorker)}>{currentWorker?.worker_email}</Text>
        {/* <Text style={styles.location} numberOfLines={1}>{item.job_country}</Text> */}
      </View>
    </TouchableOpacity>
  )
}

export default WorkerCard

const styles = StyleSheet.create({
  container: (email, currentWorker) => ({
    width: 150,
    padding: SIZES.xLarge,
    backgroundColor: email === currentWorker?.worker_email ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    alignItems: "center",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (email, currentWorker) => ({
    width: 50,
    height: 50,
    backgroundColor: email === currentWorker?.worker_email ? "#FFF" : COLORS.white,
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
  jobName: (email, currentWorker) => ({
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: email === currentWorker?.worker_email ? COLORS.white : COLORS.primary,
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
    color: email === currentWorker?.worker_email ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});