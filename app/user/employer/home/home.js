import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Text, RefreshControl } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { images } from '../../../../constants';

import { ScreenHeaderBtn } from '../../worker';
import { PostedJob, Footer, Welcome} from '../'

import { FirestoreDataFetch } from '..';
import { FIREBASE_AUTH } from '../../../../firebase';

const Home = () => {

    const { data, object, isLoading, error, refetch } = FirestoreDataFetch("employer", FIREBASE_AUTH.currentUser?.email)
    // console.log(object.employer_email)

    const router = useRouter();
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)

    // reroute to #searchTerm page (<Welcome/>)
    const handleClick = () => {
        if (searchTerm) {
            router.push(`/search/${searchTerm}`)
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    const signOut = async () => {
        setLoading(true);
        try {
          const response = await FIREBASE_AUTH.signOut();
          console.log(response);
          alert("Sign out successful: ")
          router.push('/screen/login')
        } catch (error) {
          console.log(error);
          alert("Sign out failed: " + error.message)
        } finally {
          setLoading(false)
        }
      }

    return(
        <SafeAreaView style={{flex: 1 ,backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite,
                    },
                    headerTitleStyle:{
                        display:"flex",
                        flex:1,
                        alignSelf:"center",
                        textAlign:"center"
                    },
                    headerShadowVisible: false,
                    headerLeft: ()=>(
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" handlePress={()=>router.push(`/screen/login`)}/>
                    ),
                    headerRight: ()=>(
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" 
                        handlePress={()=>{
                            FIREBASE_AUTH.currentUser? router.push(`/user/employer/profile-details/${object?.id}`)
                            : router.push(`/screen/login`)
                        }}/>
                    ),  
                    headerTitle: 'HOME'
                }}
            />
            <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
                <View
                    style={{
                        flex:1,
                        padding:SIZES.medium
                    }}
                >
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick = {handleClick}
                        user={FIREBASE_AUTH.currentUser?.email}
                    />
                    <PostedJob/>
                </View>

            </ScrollView>

            {/* <View style={styles.container}>
                <TouchableOpacity 
                    onPress={()=>router.push("../createJob")} 
                    style={styles.applyBtn}
                >
                    <Text style={styles.applyBtnText}>
                    +
                    </Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

export default Home;

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
        flexDirection: "row",
        },
    applyBtn: {
        width: 55,                                               
        height: 55,
        backgroundColor: "#FE7654",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
    },
    applyBtnText: {
        fontSize: SIZES.xxLarge,
        color: COLORS.white,
        fontFamily: FONT.bold,
    },
});