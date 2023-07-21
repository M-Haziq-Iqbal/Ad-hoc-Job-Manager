import { useState } from "react";
import { SafeAreaView, ActivityIndicator, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter, useSearchParams } from "expo-router";

import useFetch from "../../hook/useFetch";
import { ScreenHeaderBtn, NearbyJobCard } from "../user/worker";
import { COLORS, FONT, SIZES, icons } from "../../constants";

const JobSearch = () => {

    const router = useRouter()
    const params = useSearchParams()

    const { data, isLoading, error, refetch, pageNum, handlePagination} = useFetch(
        'search',{
            query: params.id,
            page: pageNum,
        }
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <NearbyJobCard
                        job={item}
                        handleNavigate={() => router.push(`/user/worker/job-details/${item.job_id}`)}
                    />
                )}
                keyExtractor={(item) => item.job_id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                        </View>

                        <View style={styles.loaderContainer}>
                            {isLoading ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : error && (
                                <Text>Oops something went wrong ehe</Text>
                            )}
                        </View>
                    </>
                )}

                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{pageNum}</Text>
                        </View>
                        <TouchableOpacity
                        
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default JobSearch;

//Stylesheet
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    searchTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
    },
    noOfSearchedJobs: {
        marginTop: 2,
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },
    loaderContainer: {
        marginTop: SIZES.medium
    },
    footerContainer: {
        marginTop: SIZES.small,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    paginationButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tertiary
    },
    paginationImage: {
        width: '60%',
        height: '60%',
        tintColor: COLORS.white
    },
    paginationTextBox: {
        width: 30,
        height: 30,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    paginationText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.primary
    }
});