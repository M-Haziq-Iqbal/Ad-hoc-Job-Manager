import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'

//MAKE SURE TO IMPORT FRAGMENT PROPERLY IN BRACKET!!!
import { WorkerCard } from '../index'

const Worker = ({data, emailArray, isLoading, error, setSelectedWorker}) => {

  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState([])
  const [currentEmail, setCurrentEmail] = useState([])
  const [currentWorker, setCurrentWorker] = useState()

  // reroute to #item.job_id page (<PopularJobCard/>)
  const handlePress = (email) => {
    setCurrentEmail(email)
  }

  // Function to find the object that has the specific email in the 'worker_email' array
  function findObjectByWorkerEmail(currentEmail) {
    return data.find(obj => obj.worker_email.includes(currentEmail));
  }

  async function findObjectByWorkerEmailAsync(currentEmail) {
    const foundObject = findObjectByWorkerEmail(currentEmail);
    if (foundObject) {
      return foundObject;
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add a delay before the next iteration
      return findObjectByWorkerEmailAsync(currentEmail); // Recursive call to try again
    }
  }

  findObjectByWorkerEmailAsync(currentEmail)
  .then(foundObject => {
    // console.log("Found Object:", foundObject);
    setCurrentWorker(foundObject)
  })
  .catch(error => {
    console.error("Error occurred:", error);
  });

  // useEffect(() => {
  //   handlePress(emailArray);
  // }, []);

  // console.log("emailArray: ", emailArray)
  
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
            data={emailArray}
            renderItem={({item})=>( //each email
              <WorkerCard 
                email={item} //each email
                handlePress={handlePress}
                currentWorker={currentWorker}
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