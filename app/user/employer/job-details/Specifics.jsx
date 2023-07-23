import React from 'react'
import { View, Text } from 'react-native'

const ContentList = ({object, activeTab}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeTab} Details:</Text>

      {
        (activeTab === "Worker") && 
        <View style={styles.pointsContainer}>
          <View key={"worker_name"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Name: {object[0]?.worker_name}</Text>
          </View>

          <View key={"worker_email"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Email: {object[0]?.worker_email}</Text>
          </View>

          <View key={"worker_location"} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> Location: {object[0]?.worker_location}</Text>
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

const Specifics = ({jobObject, workerObject, activeTab}) => {

  switch (activeTab) {
    case "Worker": return (
      <ContentList
        activeTab={activeTab}
        // point={object[0].job_description??['N/A']}
        object={workerObject}
      />
    )

    case "Job": return (
      <ContentList 
        activeTab={activeTab}
        // point={data[0].job_description??['N/A']}
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