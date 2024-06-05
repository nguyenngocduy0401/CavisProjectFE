import { View, Text, ImageBackground, StyleSheet, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import image from '../../../assets/images/carousel-image-2.png'
import background from '../../../assets/images/premium-banner.png'

const screenWidth = Dimensions.get('window').width;

export default function PremiumBanner() {
    return (
        <TouchableOpacity onPress={() => console.log("premium")} style={styles.container}>
            <ImageBackground source={background} style={styles.information} imageStyle={{ borderRadius: 16 }}>
                <View style={styles.saleBanner}>
                    <Text style={styles.saleTitle}>Save 50%</Text>
                </View>
                <Text style={styles.title}>7 Day free trial</Text>
                <Text style={styles.description}>Then 19.99$/year (only 1.67$/month)</Text>
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
        width: 100,
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