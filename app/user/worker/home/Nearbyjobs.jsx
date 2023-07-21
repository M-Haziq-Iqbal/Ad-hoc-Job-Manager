import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import NearbyJobCard  from './NearbyJobCard'
import { FirestoreDataFetch } from '..'

const NearbyJobs = () => {

  const router = useRouter();

  //call custom hooks fetching Firebase data
  const { data, isLoading, error } = FirestoreDataFetch("jobDetail")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Jobs</Text>
        <TouchableOpacity>
            <Text style={styles.headerBtn}> Show All </Text> 
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary}/>
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((data) => (
            <NearbyJobCard 
              job={data} 
              key={`nearby-job-${data?.job_id}`}
              handleNavigate = {() => router.push(`/user/worker/job-details/${data.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default NearbyJobs

import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
});
