import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { FIRESTORE_DB } from "../../../../firebase";

import { COLORS, icons, SIZES } from "../../../../constants";
import { Company, JobTabs, ScreenHeaderBtn } from "../../worker";
import { FirestoreDataFetch, Specifics, Footer } from "..";

import { Worker } from "..";

const tabs = ["Job","Worker"]

const JobDetails = () => {

    const { id } = useSearchParams();
    const router = useRouter();

    const [selectedWorker, setSelectedWorker] = useState([])
    const [emailArray, setEmailArray] = useState()

    // async function job() {
    //     for (let i = 0; i < jobObject.worker_email.length; i++) {
    //         const jobObject1 = await jobObject.worker_email[i]
    //         jobArray.push(jobObject1)
    //         setJobArray(jobArray)
    //     }
    // }

    // console.log(jobArray)

    // // async function job() {
    // //     const jobObject1 =  await jobObject.worker_email[0]
    // //     return jobObject1
    // // }

    // // async function executeAfterVariableHasValue() {
    // //     try {
    // //         const myVariable = await job();
    // //         console.log("myVariable has a value:", myVariable);
    // //     } catch (error) {
    // //         console.error("Error fetching data:", error);
    // //     }
    // // }

    // job();

    const { 
        data: jobData, 
        object: jobObject, 
        isLoading: jobIsLoading, 
        error: jobError, 
        refetch: jobRefetch
    } = FirestoreDataFetch("jobDetail", id)
    
    const { 
        data: workerData, 
        objectArray: workerObject, 
        isLoading: workerIsLoading, 
        error: workerError, 
        refetch: workerRefetch
    } = FirestoreDataFetch("worker")

    async function job() {
        const emailArray =  await jobObject.worker_email
        return emailArray
    }

    job().then((emailArray) => {
        setEmailArray(emailArray)
    }).catch((error) => {
        console.error('Error fetching emailArray:', error);
    })

    // console.log(workerData)
        
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        jobRefetch();
        workerRefetch();
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
                {jobIsLoading || workerIsLoading ? (
                    <ActivityIndicator/>
                ) : jobError || workerError ? (
                    <Text>Something went wrong</Text>
                ) : jobData.length === 0 || workerData.length === 0?(
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
                            emailArray={emailArray}
                            setSelectedWorker={setSelectedWorker}
                            data={workerData}
                            isLoading={workerIsLoading}
                            error={workerError}
                            refetch={workerRefetch}
                        />

                        <JobTabs
                            tabs={tabs} 
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        <Specifics
                            jobObject={jobObject}
                            workerObject={workerObject}
                            activeTab={activeTab}
                        />
                    </View>
                )}
            </ScrollView>

            <Footer jobId={id} jobObject={jobObject} workerData={workerData}/>
        </SafeAreaView>
        
    )
}

export default JobDetails