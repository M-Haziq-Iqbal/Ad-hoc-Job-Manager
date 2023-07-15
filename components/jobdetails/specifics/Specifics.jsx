import React from 'react'
import { View, Text } from 'react-native'

import styles from './specifics.style'
import stylesAbout from '../about/about.style'

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
        <Text style={stylesAbout.headText}> About the job: </Text>

        <View style={stylesAbout.contentBox}>
          <Text style={stylesAbout.contextText}>{data[0].job_description??['N/A']}</Text>
        </View>
      </View>
    )
    default: break;
  }
}

export default Specifics