import { View, Text, Dimensions, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import carouselBackground from '../../../assets/images/carousel-background.png';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import GenericButton from '../button/GenericButton';

const screenWidth = Dimensions.get('window').width;
const slides = [
    {
        image: require('../../../assets/images/carousel-image-1.png'),
        title: 'So sánh da',
        description: 'heo dõi sự thay đổi của làn da mỗi ngày',
        link: 'SkinCompare'
    },
    {
        image: require('../../../assets/images/carousel-image-2.png'),
        title: 'Phân tích da',
        description: 'Phân tích làn da, xác định các vấn đề',
        link: 'Questions',
        type: 'again'
    },
    {
        image: require('../../../assets/images/carousel-image-3.png'),
        title: 'Gợi ý sản phẩm',
        description: 'Gợi ý sản phẩm phù hợp với loại da và nhu cầu',
        link: 'Products',
    },
]

export default function GenericCarousel() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                loop
                autoplay
                dotColor={'transparent'}
                activeDotColor={'transparent'}
                dot={null}
                autoplayTimeout={5}
            >
                {slides.map((slide, index) => (
                    <ImageBackground source={carouselBackground} key={index} imageStyle={{ borderRadius: 16 }}>
                        <View style={styles.leftInformation}>
                            <Text style={styles.title}>{slide.title}</Text>
                            <Text style={styles.description}>{slide.description}</Text>
                            <GenericButton
                                containerStyle={{
                                    marginLeft: 0
                                }}
                                title={'Thử ngay'}
                                onPress={() => slide?.type ? navigation.navigate(slide.link, { type: slide.type }) : navigation.navigate(slide.link)}
                                buttonStyle={styles.buttonStyleButton}
                            />
                        </View>
                        <Image source={slide.image} style={styles.image} />
                    </ImageBackground>
                ))}
            </Swiper>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenWidth / 2,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    wrapper: {},
    leftInformation: {
        width: "50%",
        padding: 24
    },
    image: {
        width: "50%",
        height: "95%",
        position: "absolute",
        right: 0,
        bottom: 0,
        borderBottomRightRadius: 16,
    },
    title: {
        fontSize: 20,
        color: "black",
        fontWeight: '600',
    },
    description: {
        marginTop: 5,
        fontSize: 14,
        color: '#6E6E6E',
        fontWeight: '400'
    },
    buttonStyleButton: {
        height: 40,
        width: 120,
        borderWidth: 0,
        borderRadius: 30,
        marginTop: 20,
    },
})