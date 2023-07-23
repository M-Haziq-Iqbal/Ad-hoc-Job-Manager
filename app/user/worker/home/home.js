import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Pressable, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../../../../constants';
import { AvailableJob, ScreenHeaderBtn, Welcome } from '..';

import { FirestoreDataFetch } from '..';
import { FIREBASE_AUTH } from '../../../../firebase';

const Home = () => {
    
    //fetch document from "worker" collection that has the current email
    const { data, object, isLoading, error, refetch } = FirestoreDataFetch("worker", FIREBASE_AUTH.currentUser?.email)

    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)

    // reroute to #searchTerm page (<Welcome/>)
    const handleClick = () => {
        if (searchTerm) {
            router.push(`/search/${searchTerm}`)
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
                            FIREBASE_AUTH.currentUser? router.push(`/user/worker/profile-details/${object?.id}`)
                            : router.push(`/screen/login`)
                        }}/>
                    ),  
                    headerTitle: 'HOME'
                }}
            />
            <ScrollView>
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
                    <AvailableJob/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;