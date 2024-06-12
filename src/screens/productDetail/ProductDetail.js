import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, Linking } from 'react-native';
import Header from '../../components/header/Header';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import GenericButton from '../../components/button/GenericButton';
import { getProduct } from '../../services/ProductService';
import { truncateText } from '../../utils/utils';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ProductDetail({ route }) {
    const navigation = useNavigation()
    const { id } = route.params
    const [product, setProduct] = useState(null)
    async function getProductDetail(id) {
        try {
            const data = await getProduct(id);
            setProduct(data?.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProductDetail(id)
    }, [id])
    const openExternalLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Can\'t open this link: ', err));
    };
    return (
        <ScrollView style={styles.container}>
            <InsideHeader title={'Thông tin sản phẩm'} />
            {product &&
                <>
                    <View style={styles.detailContainer}>
                        {/* <View style={styles.brandContainer}>
                            <Image
                                source={{ uri: product.brand.image }}
                                style={styles.brandImage}
                            />
                        </View> */}
                        <Image
                            source={{ uri: product.urlImage }}
                            style={styles.image}
                        />
                        {/* <NormalText text={product.brand.name} /> */}
                        <TitleText title={product.productName} style={styles.title} />
                        <NormalText text={'Giá:'} />
                        <TitleText title={`${product.price.toLocaleString()}₫`} style={styles.price} color={'#DE8186'} />
                        <NormalText text={product.description} />
                        <GenericButton
                            title={'Mua ngay'}
                            onPress={() => openExternalLink(product.url)}
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
        borderWidth: 1,
        borderColor: '#E7E3E4'
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