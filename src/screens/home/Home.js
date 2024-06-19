import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Header from '../../components/header/Header';
import GenericCarousel from '../../components/genericCarousel/GenericCarousel';
import { Avatar } from '@rneui/themed';
import TitleText from '../../components/text/TitleText';
import HomeTopButton from '../../components/homeTopButton/HomeTopButton';
import emptyAvatar from '../../../assets/images/empty-avatar.png';
import skincareTopIcon from '../../../assets/icons/skincare-home-icon.png';
import makeupTopIcon from '../../../assets/icons/makeup-home-icon.png';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import PremiumBanner from '../../components/premiumBanner/PremiumBanner';
import SeeAllButton from '../../components/button/SeeAllButton';
import ProductReview from '../../components/productReview/ProductReview';
import TopMethod from '../../components/topMethod/TopMethod';
import Method from '../../components/method/Method';
import HomeCheckList from '../../components/homeCheckList/HomeCheckList';
import { getAnalystProducts } from '../../services/PersonalAnalystService';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const methodData = [
    {
        id: 1,
        image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
        title: "New VR Headsets That Will Shape the Metaverse",
        author: {
            fullName: "Mason Eduard",
            avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
        },
        type: "Skincare",
        date: "2024-01-03T14:48:00.000Z"
    },
    {
        id: 2,
        image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
        title: "New VR Headsets That Will Shape the Metaverse",
        author: {
            fullName: "Mason Eduard",
            avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
        },
        type: "Skincare",
        date: "2024-01-03T14:48:00.000Z"
    },
    {
        id: 3,
        image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
        title: "New VR Headsets That Will Shape the Metaverse",
        author: {
            fullName: "Mason Eduard",
            avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
        },
        type: "Skincare",
        date: "2024-01-03T14:48:00.000Z"
    },
    {
        id: 4,
        image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
        title: "New VR Headsets That Will Shape the Metaverse",
        author: {
            fullName: "Mason Eduard",
            avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
        },
        type: "Skincare",
        date: "2024-01-03T14:48:00.000Z"
    },
]

export default function Home() {
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const user = useSelector(userSelector)
    const currentHour = new Date().getHours();
    const [checklist, setChecklist] = useState([])
    const [products, setProducts] = useState([])
    const [methods, setMethods] = useState(methodData)
    async function getProducts() {
        try {
            const data = await getAnalystProducts(null);
            setProducts(data?.data?.items)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (isFocused) {
            getProducts()
        }
    }, [isFocused])
    return (
        <ScrollView style={styles.container}>
            <Header />
            <View style={styles.topGreeting}>
                <Avatar size={70} rounded source={user?.urlImage ? user.urlImage : emptyAvatar} containerStyle={styles.avatar} />
                <View>
                    <TitleText
                        title={currentHour < 12
                            ? 'Chào buổi sáng,'
                            : currentHour < 18
                                ? 'Chào buổi chiều,'
                                : 'Chào buổi tối,'}
                        color={'#FBBD98'}
                        style={{ marginTop: 0, marginBottom: 0, marginLeft: 10 }}
                    />
                    <TitleText
                        title={user.fullName ? user.fullName : user.userName}
                        style={{ marginTop: 0, marginBottom: 0, marginLeft: 10 }}
                    />
                </View>
            </View>
            <GenericCarousel />
            <>
                <TitleText title={'Cá nhân hóa'} style={styles.title} />
                <View style={styles.topButton}>
                    <HomeTopButton onPress={() => navigation.navigate('Root', { screen: 'Skincare' })} title={'Skincare'} backgroundColor={'#FFF9F0'} icon={skincareTopIcon} />
                    <HomeTopButton onPress={() => navigation.navigate('Root', { screen: 'Makeup' })} title={'Makeup'} backgroundColor={'#EBF3F8'} icon={makeupTopIcon} />
                </View>
            </>
            <HomeCheckList />
            <PremiumBanner />
            <>
                <View style={styles.titleContainer}>
                    <View style={{ width: "80%" }}>
                        <TitleText title={'Sản phẩm gợi ý'} style={styles.title} />
                    </View>
                    <SeeAllButton onPress={() => navigation.navigate('Products')} />
                </View>
                <FlatList
                    style={[styles.productReview]}
                    horizontal
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProductReview key={item.id} image={item.urlImage} title={item.productName} description={item.description} onPress={() => navigation.navigate("ProductDetail", { id: item.id })} />
                    )}
                />
            </>
            <>
                <View style={styles.titleContainer}>
                    <View style={{ width: "80%" }}>
                        <TitleText title={'Phương pháp hữu ích'} style={styles.title} />
                    </View>
                    <SeeAllButton onPress={() => console.log('See all tips')} />
                </View>
                {methods.length > 0 &&
                    <View style={{ paddingTop: 20 }}>
                        <TopMethod image={methods[0].image} title={methods[0].title} author={methods[0].author} type={methods[0].type} date={methods[0].date} onPress={() => navigation.navigate("MethodDetail", { id: methods[0].id })} />
                        {methods.length > 1 && methods.slice(1).map((method) => (
                            <Method key={method.id} image={method.image} title={method.title} type={method.type} onPress={() => navigation.navigate("MethodDetail", { id: method.id })} />
                        ))}
                    </View>
                }
            </>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    avatar: {
        borderWidth: 2,
        borderColor: '#FDD3CA',
    },
    topGreeting: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },
    topButton: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
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
    productReview: {
        paddingTop: 10,
        paddingBottom: 10,
    },
})