import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity, FlatList } from "react-native";

import styles from './tabs.style'
import { styles2 } from '../specifics/specifics.style'
import { SIZES } from '../../../constants'

const TabButton = ({name, activeTab, setActiveTab}) => (
  <TouchableOpacity
    onPress={() => setActiveTab(name)}
    style={styles.btn(name, activeTab)}
  >
    <Text style={styles.btnText(name, activeTab)}> {name} </Text>
  </TouchableOpacity>
)

const Tabs = ({data, tabs, activeTab, setActiveTab}) => {
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={tabs}
        renderItem={({item}) => (
          <TabButton 
            name={item}
            activeTab={activeTab}
            setActiveTab={() => setActiveTab(item)}
          />
        )}
        keyExtractor={item => item}
        contentContainerStyle={{columnGap: SIZES.small/2}}
        horizontal
      />
    </View>
    
  )
}

export default Tabs