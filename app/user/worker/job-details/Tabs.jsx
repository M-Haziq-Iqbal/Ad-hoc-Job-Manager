import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity, FlatList } from "react-native";

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

//Stylesheet
import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
  },
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    backgroundColor: name === activeTab ? COLORS.primary : COLORS.white,
    borderRadius: SIZES.medium,
    marginLeft: 2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: "DMMedium",
    fontSize: SIZES.small,
    color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
  }),

  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray2,
    marginTop: 6,
  },
});