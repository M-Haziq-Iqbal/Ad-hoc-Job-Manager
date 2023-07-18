import {useState} from 'react';
import {View, ScrollView, SafeAreaView, Pressable, Text} from 'react-native';
import {Stack, useRouter} from 'expo-router';

import {COLORS, icons, images, SIZES} from '../constants';
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components';

import { FIREBASE_AUTH } from '../firebase';

const Home = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)

    // reroute to #searchTerm page (<Welcome/>)
    const handleClick = () => {
        if (searchTerm) {
            router.push(`/search/${searchTerm}`)
        }
    }

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
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" handlePress={signOut}/>
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
                    <Popularjobs/>
                    <Nearbyjobs/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;