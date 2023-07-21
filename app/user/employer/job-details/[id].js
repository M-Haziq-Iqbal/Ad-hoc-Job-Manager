import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { COLORS, icons, SIZES } from "../../../../constants";
import { Company, JobFooter, JobTabs, ScreenHeaderBtn, Specifics  } from "../../worker";
import { FirestoreDataFetch } from "..";

import { Worker } from "..";

const tabs = ["Job","Worker"]

const JobDetails = () => {

    const { id } = useSearchParams();
    const router = useRouter();

    const { data, object, isLoading, error, refetch } = FirestoreDataFetch("jobDetail", id)
    // console.log("id: " + id)

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
                {isLoading ? (
                    <ActivityIndicator/>
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
                        <Worker
                            data={data}
                            isLoading={isLoading}
                            error={error}
                            refetch={refetch}
                        />

                        <JobTabs
                            tabs={tabs} 
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        <Specifics
                            data={data}
                            object={object}
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