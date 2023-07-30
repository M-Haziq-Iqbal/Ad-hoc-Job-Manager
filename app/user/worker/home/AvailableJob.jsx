import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

import AvailableJobCard  from './AvailableJobCard'
import { FirestoreDataFetch } from '..'

const AvailableJob = () => {

  const router = useRouter();
  const isFocused = useIsFocused();

  //call custom hooks fetching Firebase data
  const { data, objectArray, isLoading, error, refetch } = FirestoreDataFetch("jobDetail")

  //refetch jobDetail data after redirect from another page
  useEffect(() => {
    if(isFocused){
      refetch();
    }
  }, [isFocused]);

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
          data?.map((job) => (
            <AvailableJobCard 
              job={job} 
              key={`available-job-${job?.id + job?.title}`}
              handleNavigate = {() => router.push(`/user/worker/job-details/${job.id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default AvailableJob

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
