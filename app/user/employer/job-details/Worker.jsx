import { memo } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'

//MAKE SURE TO IMPORT FRAGMENT PROPERLY IN BRACKET!!!
import { WorkerCard } from '..'

const Worker = ({setCurrentEmail, currentEmail, emailArray}) => {

  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Workers</Text>
        <TouchableOpacity>
            <Text style={styles.headerBtn}> Show All </Text> 
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          (emailArray.length === 0) &&
          <Text> Sorry, there is no worker applying yet</Text>
        }
        {
          emailArray &&
          <FlatList
            data={emailArray}
            renderItem={({item})=>( //each email
              <WorkerCard 
                email={item} //each email
                setCurrentEmail={setCurrentEmail}
                currentEmail={currentEmail}
              />
              // <Text>{item.job_id}</Text>
            )}
            horizontal
            keyExtractor={item => item + Date.now().toString()}
            contentContainerStyle = {{columnGap: SIZES.medium}}
          />
        }
      </View>
    </View>
  )
}

export default memo(Worker)

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