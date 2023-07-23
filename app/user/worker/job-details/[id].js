import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState, useEffect} from "react";

import { Company, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '..'
import { COLORS, icons, SIZES } from "../../../../constants";

import { FirestoreDataFetch } from "..";

const tabs = ["Job","Employer"]

const JobDetails = () => {

    const { id } = useSearchParams();
    const router = useRouter();

    const { 
        data: jobData, 
        object: jobObject, 
        isLoading: jobIsLoading, 
        error: jobError, 
        refetch: jobRefetch
    } = FirestoreDataFetch("jobDetail", id)
    
    const { 
        data: employerData, 
        object: employerObject, 
        isLoading: employerIsLoading, 
        error: employerError, 
        refetch: employerRefetch
    } = FirestoreDataFetch("employer", jobObject.employer_email)

    
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        jobRefetch();
        employerRefetch();
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
                            handlePress={() => {
                                router.back()
                            }}
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
                {jobIsLoading || employerIsLoading ? (
                    <ActivityIndicator/>
                ) : jobError || employerError ? (
                    <Text>Something went wrong</Text>
                ) : (jobData.length === 0 || employerData.length === 0)?(
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
                            companyLogo={jobObject.employer_logo} 
                            jobTitle={jobObject.job_title}
                            companyName={jobObject.employer_name}
                            location={jobObject.job_country}
                        />

                        <JobTabs
                            tabs={tabs} 
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        <Specifics
                            employerData={employerData}
                            employerObject={employerObject}
                            jobData={jobData}
                            jobObject={jobObject}
                            activeTab={activeTab}
                        />
                    </View>
                )}
            </ScrollView>

            <JobFooter jobId={id} jobObject={jobObject} jobRefetch={jobRefetch}/>
        </SafeAreaView>
        
    )
}

export default JobDetails