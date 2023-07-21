import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { useRouter } from 'expo-router'

const Footer = ({url}) => {

  const router = useRouter()

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={()=>router.push("../createJob")} 
        style={styles.applyBtn}
      >
        <Text style={styles.applyBtnText}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer

//Stylesheet
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#F37453",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: "#F37453",
  },
  applyBtn: {
    width: 55,
    height: 55,
    backgroundColor: "#FE7654",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: "85%",
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});