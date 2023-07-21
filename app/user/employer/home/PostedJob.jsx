import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter, useState } from 'expo-router'
import { FirestoreDataFetch } from '..'
import PostedJobCard  from './PostedJobCard'

const PostedJob = () => {

  const router = useRouter();
  
  const { data, isLoading, error } = FirestoreDataFetch("jobDetail")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posted Jobs</Text>
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
            <PostedJobCard 
              job={job} 
              key={`posted-job-${job?.job_id}`}
              handleNavigate = {() => router.push(`/user/employer/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>

      <View style={styles.containerBtn}>
          <TouchableOpacity 
              onPress={()=>router.push("../createJob")} 
              style={styles.applyBtn}
          >
              <Text style={styles.applyBtnText}>
              +
              </Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default PostedJob

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
  containerBtn: {
    position: "relative",
    bottom: 0,
    left: 10,
    right: 0,
    padding: SIZES.small,
    justifyContent: "flex-end",
    flexDirection: "row",
    },
  applyBtn: {
    width: 50,                                               
    height: 50,
    backgroundColor: "#FE7654",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    fontFamily: FONT.bold,
},
});