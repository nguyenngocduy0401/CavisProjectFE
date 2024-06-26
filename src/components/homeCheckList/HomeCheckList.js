import { View, Text, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import CheckComponent from './CheckComponent';
import TitleText from '../text/TitleText';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const dailyListData = [
    // {
    //     id: 1,
    //     title: "Nhật ký buổi sáng",
    //     backgroundColor: "#E7F2E7",
    //     checkColor: "#7CB97C",
    //     image: require('../../../assets/images/morning-log-image.png'),
    //     check: true,
    // },
    // {
    //     id: 2,
    //     title: "Nhật ký buổi tối",
    //     backgroundColor: "#EBE2F5",
    //     checkColor: "#703CAA",
    //     image: require('../../../assets/images/evening-log-image.png'),
    //     check: true,
    // },
    {
        id: 3,
        title: "Nhật ký chụp ảnh",
        backgroundColor: "#FDF0F0",
        checkColor: "#BE3333",
        image: require('../../../assets/images/selfie-log-image.png'),
        check: false,
        page: '',
    },
    {
        id: 4,
        title: "Lịch trình buổi sáng",
        backgroundColor: "#FAF3E8",
        checkColor: "#DCBD9E",
        image: require('../../../assets/images/morning-routine.png'),
        check: false,
        page: 'SkincareRoutine',
        type: 'Morning',
    },
    {
        id: 5,
        title: "Lịch trình buổi tối",
        backgroundColor: "#E6F0F6",
        checkColor: "#78B5D1",
        image: require('../../../assets/images/evening-routine.png'),
        check: true,
        page: 'SkincareRoutine',
        type: 'Night',
    },
]

export default function HomeCheckList() {
    const navigation = useNavigation()
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