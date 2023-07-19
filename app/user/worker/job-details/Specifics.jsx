import React from 'react'
import { View, Text } from 'react-native'

const ContentList = ({point, activeTab}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeTab}:</Text>

      <View style={styles.pointsContainer}>
        {point.map((details, index) => (
          <View key={details + index} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}> {details}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const Specifics = ({data, activeTab}) => {
  switch (activeTab) {
    case "Qualifications": return (
      <ContentList 
        activeTab={activeTab}
        point={data[0].job_highlights?.Qualifications??['N/A']}
      />
    )
    case "Responsibilities": return (
      <ContentList 
        activeTab={activeTab}
        point={data[0].job_highlights?.Responsibilities??['N/A']}
      />
    )
    case "About": return (
      <View style={styles.container}>
        <Text style={styles.headText}> About the job: </Text>

        <View style={styles.contentBox}>
          <Text style={styles.contextText}>{data[0].job_description??['N/A']}</Text>
        </View>
      </View>
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