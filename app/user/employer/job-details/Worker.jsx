import { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'

//MAKE SURE TO IMPORT FRAGMENT PROPERLY IN BRACKET!!!
import { WorkerCard } from '../index'

const Worker = ({data, isLoading, error, refetch}) => {

  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState([])

  // reroute to #item.job_id page (<PopularJobCard/>)
  const handlePress = (item) => {
    // router.push(`/user/worker/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Workers</Text>
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
          <FlatList
            data={data}
            renderItem={({item})=>(
              <WorkerCard 
                item={item}
                handlePress={handlePress}
                selectedJob={selectedJob}

              />
              // <Text>{item.job_id}</Text>
            )}
            horizontal
            keyExtractor={item => item.job_id}
            contentContainerStyle = {{columnGap: SIZES.medium}}
          />
        )}
      </View>
    </View>
  )
}

export default Worker

//Stylesheet
import { StyleSheet } from 'react-native'
import { FONT, SIZES, COLORS } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
});