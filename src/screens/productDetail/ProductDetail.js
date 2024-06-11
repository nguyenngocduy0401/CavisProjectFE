import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, Linking } from 'react-native';
import Header from '../../components/header/Header';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import GenericButton from '../../components/button/GenericButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ProductDetail({ route }) {
    const navigation = useNavigation()
    const { id } = route.params
    const [product, setProduct] = useState({
        id: 1,
        brand: {
            image: "https://uploads-ssl.webflow.com/5f64407650a79f5bde012490/606d35de2483400d5d593872_cocoon.png",
            name: "Cocoon",
        },
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "Cà phê Đắk Lắk",
        description: "Hạt cà phê nguyên chất từ Đắk Lắk kết hợp với bơ ca cao Tiền Giang giúp làm sạch da chết cơ thể hiệu quả, làm đều màu da, khơi dậy năng lượng giúp da trở nên mềm mịn và rạng rỡ.",
        price: 200000,
        productLink: "https://hasaki.vn/san-pham/ca-phe-dak-lak-tay-da-chet-toan-than-cocoon-200ml-84643.html",
    })
    const openExternalLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Can\'t open this link: ', err));
    };
    return (
        <ScrollView style={styles.container}>
            {product &&
                <>
                    <InsideHeader title={product.title} />
                    <View style={styles.detailContainer}>
                        <View style={styles.brandContainer}>
                            <Image
                                source={{ uri: product.brand.image }}
                                style={styles.brandImage}
                            />
                        </View>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.image}
                        />
                        <NormalText text={product.brand.name} />
                        <TitleText title={product.title} style={styles.title} />
                        <NormalText text={'Regular Price:'} />
                        <TitleText title={`${product.price.toLocaleString()}₫`} style={styles.price} color={'#DE8186'} />
                        <NormalText text={product.description} />
                        <GenericButton
                            title={'BUY NOW'}
                            onPress={() => openExternalLink(product.productLink)}
                            buttonStyle={styles.buttonStyleButton}
                        />
                    </View>
                </>
            }
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
    brandContainer: {
        width: '100%',
        justifyContent: 'center',
        height: 70,
        paddingBottom: 10,
        borderBottomColor: '#E7E3E4',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    brandImage: {
        height: '100%',
        resizeMode: 'contain'
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 16,
        marginBottom: 20,
    },
    title: {
        marginLeft: 0,
        marginTop: 5,
        marginBottom: 10,
    },
    price: {
        marginLeft: 0,
        marginTop: 5,
        fontSize: 20,
        marginBottom: 10,
    },
    buttonStyleButton: {
        height: 50,
        borderWidth: 0,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
    },
})