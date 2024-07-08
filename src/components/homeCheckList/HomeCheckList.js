import { View, Text, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import CheckComponent from './CheckComponent';
import TitleText from '../text/TitleText';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getSkincareRoutine, getTodayPhoto } from '../../services/UserService';

const screenWidth = Dimensions.get('window').width;

const dailyListData = [
    {
        id: 1,
        title: "Lịch trình buổi sáng",
        backgroundColor: "#FAF3E8",
        checkColor: "#DCBD9E",
        image: require('../../../assets/images/morning-routine.png'),
        check: false,
        page: 'SkincareRoutine',
        type: 'Morning',
    },
    {
        id: 2,
        title: "Lịch trình buổi tối",
        backgroundColor: "#E6F0F6",
        checkColor: "#78B5D1",
        image: require('../../../assets/images/evening-routine.png'),
        check: false,
        page: 'SkincareRoutine',
        type: 'Night',
    },
    {
        id: 3,
        title: "Nhật ký làn da",
        backgroundColor: "#FDF0F0",
        checkColor: "#BE3333",
        image: require('../../../assets/images/selfie-log-image.png'),
        check: false,
        page: 'CameraOpen',
    },
]

export default function HomeCheckList() {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    async function getSkincare() {
        const data = await getSkincareRoutine();
        dailyListData.map(daily => {
            if (daily.type === 'Morning') {
                daily.check = data?.data?.morning
            } else if (daily.type === 'Night') {
                daily.check = data?.data?.night
            }
        })
    }
    async function getDays() {
        const data = await getTodayPhoto()
        const items = data?.data?.items
        if (items && items.length > 0) {
            dailyListData.map(daily => {
                if (daily.page === 'CameraOpen') {
                    daily.check = true
                }
            })
        }
    }
    useEffect(() => {
        if (isFocused) {
            getDays()
            getSkincare()
        }
    }, [isFocused])
    return (
        <>
            <View style={styles.titleContainer}>
                <View style={{ width: "80%" }}>
                    <TitleText title={'Hàng ngày'} style={styles.title} />
                </View>
            </View>
            <FlatList
                style={styles.container}
                horizontal
                data={dailyListData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CheckComponent title={item.title} backgroundColor={item.backgroundColor} checkColor={item.checkColor} image={item.image} check={item.check} onPress={() => (item?.type && item?.page) ? navigation.navigate(item.page, { type: item.type }) : navigation.navigate(item.page)} />
                )}
            />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    title: {
        marginLeft: 20,
        marginBottom: 0,
        marginTop: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
})