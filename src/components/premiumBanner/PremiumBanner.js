import { View, Text, ImageBackground, StyleSheet, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import image from '../../../assets/images/carousel-image-2.png'
import background from '../../../assets/images/premium-banner.png'
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function PremiumBanner() {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Premium')} style={styles.container}>
            <ImageBackground source={background} style={styles.information} imageStyle={{ borderRadius: 16 }}>
                <View style={styles.saleBanner}>
                    <Text style={styles.saleTitle}>Tiết kiệm 165.000₫</Text>
                </View>
                <Text style={styles.title}>Chỉ 200.000₫/năm</Text>
                <Text style={styles.description}>Dùng thử với giá 5.000₫/5 ngày</Text>
                <Image source={image} style={styles.image} />
            </ImageBackground>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    information: {
        padding: 24,
        height: 150
    },
    image: {
        width: "45%",
        height: 175,
        position: "absolute",
        right: 0,
        top: -25,
        borderBottomRightRadius: 16,
    },
    title: {
        fontSize: 20,
        color: "#fff",
        fontWeight: '600',
    },
    description: {
        marginTop: 5,
        fontSize: 14,
        color: '#fff',
        fontWeight: '400'
    },
    buttonStyleButton: {
        height: 40,
        width: 120,
        borderWidth: 0,
        borderRadius: 30,
        marginTop: 20,
    },
    saleBanner: {
        width: 150,
        height: 35,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
    },
    saleTitle: {
        color: "#F37775"
    },
})