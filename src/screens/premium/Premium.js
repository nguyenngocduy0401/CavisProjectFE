import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import GenericButton from '../../components/button/GenericButton';
import premiumIcon from '../../../assets/icons/premium-icon.png';
import premiumCheckIcon from '../../../assets/icons/premium-check-icon.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const premiumFunctions = [
    "Truy cập đầy đủ vào thông tin và hướng dẫn cá nhân hóa hàng ngày",
    "Các đề xuất linh hoạt cho loại da và vấn đề của bạn",
    "Đề xuất lịch trình cá nhân hóa để đạt được mục tiêu làn da của bạn",
    "Truy cập độc quyền vào giáo dục hàng ngày về chăm sóc da và cộng đồng các chuyên gia chăm sóc da",
    "Nhận diện các yếu tố gây kích ứng da của bạn",
    "Thêm các loại mỹ phẩm khác nhau vào bộ sưu tập của bạn"
];
const premiumPackages = [
    {
        id: "623a23ff-4ee9-409a-bf30-2e764e8bd754",
        title: '5.000₫/5 ngày',
        description: 'Chỉ 1.000₫/ngày',
        price: 5000,
    },
    {
        id: "56866515-9d42-4209-a3f9-62e166cb322a",
        title: '200.000₫/1 năm',
        description: 'Tiết kiệm đến 165.000₫',
        price: 200000,
    }
]

export default function Premium() {
    const navigation = useNavigation()
    const [activePremiumPackage, setActivePremiumPackage] = useState(null)
    return (
        <ScrollView style={styles.container}>
            <InsideHeader title={'Premium'} />
            <View style={styles.detailContainer}>
                <View style={styles.topContainer}>
                    <Image
                        source={premiumIcon}
                        style={styles.topImage}
                    />
                    <TitleText title={'Mở khóa Cavis Premium'} style={styles.title} />
                </View>
                {premiumFunctions.map((pre, index) => (
                    <View key={index} style={styles.premiumFunctionContainer}>
                        <Image
                            source={premiumCheckIcon}
                            style={styles.checkImage}
                        />
                        <NormalText text={pre} />
                    </View>
                ))}
                <View style={{ marginTop: 20 }}>
                    {premiumPackages.map((prePackage, index) => (
                        <TouchableOpacity key={index} onPress={() => setActivePremiumPackage(prePackage)} style={prePackage === activePremiumPackage ? styles.prePackageAcive : styles.prePackage}>
                            <View>
                                <TitleText title={prePackage.title} style={styles.packageTitle} />
                                <NormalText text={prePackage.description} />
                            </View>
                            {prePackage === activePremiumPackage ?
                                <Image
                                    source={premiumCheckIcon}
                                    style={styles.prePackageActiveCheckImage}
                                />
                                : <Image
                                    style={styles.prePackageCheckImage}
                                />}
                        </TouchableOpacity>
                    ))}
                </View>
                <GenericButton
                    title={'Đăng kí ngay'}
                    disabled={!activePremiumPackage}
                    onPress={() => navigation.navigate('Payment', { premiumPackage: activePremiumPackage })}
                    buttonStyle={styles.buttonStyleButton}
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    detailContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    topContainer: {
        width: '100%',
        height: 70,
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    topImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    premiumFunctionContainer: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 10,
        paddingRight: 20,
    },
    checkImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    title: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonStyleButton: {
        height: 50,
        borderWidth: 0,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
    },
    packageTitle: {
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 5,
        fontSize: 18,
    },
    prePackageAcive: {
        borderColor: '#F27272',
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    prePackage: {
        borderColor: '#E7E3E4',
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    prePackageCheckImage: {
        width: 17,
        height: 17,
        borderRadius: 10,
        borderColor: '#E7E3E4',
        borderWidth: 1,
    },
    prePackageActiveCheckImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
})