import React from 'react'
import { View, Text } from 'react-native'

const ContentList = ({data, object, point, activeTab}) => {

  // // List of properties to keep
  const propertiesToKeep = ["job_country", "job_description", "job_employment_type", "job_title" ]

  // Create a new object with only the selected properties
  const filteredObject = Object.fromEntries(
    Object.entries(object[0]).filter(([key]) =>
      propertiesToKeep.includes(key)
    )
  );
  
  const value = Object.values(filteredObject)

  console.log(object[0])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeTab} Details:</Text>

      <View style={styles.pointsContainer}>
        {value.map((details, index) => (
          <View key={details + index} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> {details}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const Specifics = ({data, object, activeTab}) => {

  switch (activeTab) {
    case "Worker": return (
      <ContentList
        object={object}
        activeTab={activeTab}
        // point={object[0].job_description??['N/A']}
        data={data}
      />
    )

    case "Job": return (
      <ContentList 
        object={object}
        activeTab={activeTab}
        // point={data[0].job_description??['N/A']}
        data={data}
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