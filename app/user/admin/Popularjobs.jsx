import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import PopularJobCard from './PopularJobCard'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {

  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState([])

  // reroute to #item.job_id page (<PopularJobCard/>)
  const handlePress = (item) => {
    router.push(`/user/worker/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }
  
  const { data, isLoading, error } = useFetch(
    'search', {
      query: 'React developer',
      num_pages: 1
    }
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
              <PopularJobCard 
                item={item}
                handlePress={handlePress}
                selectedJob={selectedJob}
              />
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

export default Popularjobs

//Stylesheet
import { StyleSheet } from 'react-native'
import { FONT, SIZES, COLORS } from '../../../constants'

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