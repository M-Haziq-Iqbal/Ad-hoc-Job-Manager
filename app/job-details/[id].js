import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity } from "react-native";
import { Stack, Tabs, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from '../../hook/useFetch'

const tabs = ["About","Qualifications","Responsibilities"]

const JobDetails = () => {

    const params = useSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch(
        'job-details', {
          job_id: params.id
        }
    )
    
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    },[])

    return (
        <SafeAreaView style={{ flex:1 , backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerStyle:{
                        headerStyle: { backgroundColor: COLORS.lightWhite},
                        headerShadowVisible: false,
                        headerBackVisible: false,
                    },
                    // headerTitle: `${data[0]?.job_title??[""]}`
                    headerTitle: "JOB DETAILS",
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    )
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {isLoading ? (
                    <ActivityIndicator size={"large"}/>
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0?(
                    <Text>No data</Text>
                ) : (
                    <View 
                        style={{
                            flex: 1,
                            padding:SIZES.medium,
                            paddingBottom: 100
                        }}
                    >
                        <Company 
                            companyLogo={data[0].employer_logo} 
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />

                        <JobTabs
                            tabs={tabs} 
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        <Specifics
                            data={data}
                            activeTab={activeTab}
                        />
                    </View>
                )}
            </ScrollView>

            <JobFooter url={data[0]?.job_google_link??'https://careers.google.com/jobs/results'}/>
        </SafeAreaView>
        
    )
}

export default JobDetails