import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import Header from '../../components/header/Header';
import { useNavigation } from '@react-navigation/native';
import ProductView from '../../components/productView/ProductView';
import InsideHeader from '../../components/insideHeader/InsideHeader';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const productData = [
    {
        id: 1,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 2,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 3,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 4,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 5,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 6,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 7,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 8,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 9,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
    {
        id: 10,
        image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
        title: "The cocoon",
        description: "Sản phẩm cocoon abcxyz",
        price: 200000,
    },
]

export default function Products() {
    const navigation = useNavigation()
    const [products, setProducts] = useState(productData)
    return (
        <View style={styles.container}>
            <InsideHeader title={'Products'} />
            <FlatList
                style={styles.productView}
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductView key={item.id} image={item.image} title={item.title} description={item.description} price={item.price} onPress={() => navigation.navigate("ProductDetail", { id: item.id })} />
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    productView: {
        paddingTop: 10,
        paddingBottom: 10,
    },
})