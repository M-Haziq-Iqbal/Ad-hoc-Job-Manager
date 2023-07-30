import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { COLORS, icons, SIZES } from "../../../../constants";
import { Company, JobTabs, ScreenHeaderBtn } from "../../worker";
import { FirestoreDataFetch, Specifics, Footer } from "..";

import { Worker } from "..";

const tabs = ["Worker", "Job"]

const JobDetails = () => {

    const { id } = useSearchParams();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState(tabs[0])
    const [refreshing, setRefreshing] = useState(false);
    const [currentEmail, setCurrentEmail] = useState();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        jobRefetch();
        setRefreshing(false);
    },[])

    const { 
        data: jobData, 
        object: jobObject, 
        isLoading: jobIsLoading, 
        error: jobError, 
        refetch: jobRefetch
    } = FirestoreDataFetch("jobDetail", id)
    
    console.log("currentEmail: ",currentEmail)

    return (
        <SafeAreaView style={{ flex:1 , backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerStyle:{
                        headerStyle: { backgroundColor: COLORS.lightWhite},
                        headerShadowVisible: false,
                        headerBackVisible: false,
                    },
                    headerTitle: "DETAILS",
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
                {jobIsLoading ? (
                    <ActivityIndicator/>
                ) : jobError ? (
                    <Text>Something went wrong</Text>
                ) : jobData.length === 0 ?(
                    <Text>No data</Text>
                ) : (
                    <View 
                        style={{
                            flex: 1,
                            padding:SIZES.medium,
                            paddingBottom: 100
                        }}
                    >
                        <Worker
                            emailArray={jobObject.worker_email}
                            setCurrentEmail={setCurrentEmail}
                            currentEmail={currentEmail}
                        />

                        <JobTabs
                            tabs={tabs} 
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        <Specifics
                            currentEmail={currentEmail}
                            jobObject={jobObject}
                            activeTab={activeTab}
                        />
                    </View>
                )}
            </ScrollView>

            <Footer jobId={id} jobObject={jobObject} activeTab={activeTab} currentEmail={currentEmail}/>
        </SafeAreaView>
    )
}

export default JobDetails