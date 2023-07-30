import React from 'react'
import { View, Text } from 'react-native'
import { FirestoreDataFetch } from '..'

const ContentList = ({object, activeTab, currentEmail}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeTab} Details:</Text>
      {
        (activeTab === "Worker") && !currentEmail &&
        <View style={styles.pointsContainer}>
          <View style={styles.pointWrapper}>
            <Text style={styles.pointText}> Please select any worker to view more details</Text>
          </View>
        </View>
      }

      {
        (activeTab === "Worker") && currentEmail &&
        <View style={styles.pointsContainer}>
          <View key={"worker_name"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Name: {object?.worker_name}</Text>
          </View>

          <View key={"worker_email"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Email: {object?.worker_email}</Text>
          </View>

          <View key={"worker_location"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Location: {object?.worker_location}</Text>
          </View>
        </View>
      }

      {
        (activeTab === "Job") && 
        <View style={styles.pointsContainer}>
          <View key={"job_title"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Type: {object?.job_title}</Text>
          </View>

          <View key={"job_description"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Decription: {object?.job_description}</Text>
          </View>

          <View key={"job_employment_type"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Employment type: {object?.job_employment_type}</Text>
          </View>
        </View>
      }
      
    </View>
  )
}

const Specifics = ({currentEmail, jobObject, activeTab}) => {

  const { 
    data: workerData, 
    object: workerObject, 
    isLoading: workerIsLoading, 
    error: workerError, 
    refetch: workerRefetch
  } = FirestoreDataFetch("worker", currentEmail)

  switch (activeTab) {
    case "Worker": return (
      <ContentList
        currentEmail={currentEmail}
        activeTab={activeTab}
        object={workerObject}
      />
    )

    case "Job": return (
      <ContentList 
        activeTab={activeTab}
        object={jobObject}
      />
    )
    default: break;
  }
}

export default Specifics

// Styles
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  pointsContainer: {
    marginVertical: SIZES.small,
  },
  pointWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: SIZES.small / 1.25,
  },
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray2,
    marginTop: 6,
  },
  pointText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginLeft: SIZES.small,
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  contentBox: {
    marginVertical: SIZES.small,
  },
  contextText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginVertical: SIZES.small / 1.25,
  },
});