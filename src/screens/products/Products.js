import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import Header from '../../components/header/Header';
import { useNavigation } from '@react-navigation/native';
import ProductView from '../../components/productView/ProductView';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import { getAnalystProducts } from '../../services/PersonalAnalystService';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Products() {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])
    async function getProducts() {
        try {
          const data = await getAnalystProducts(null);
          setProducts(data?.data?.items)
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        getProducts()
      }, [])
    return (
        <View style={styles.container}>
            <InsideHeader title={'Products'} />
            <FlatList
                style={styles.productView}
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductView key={item.id} image={item.urlImage} title={item.productName} description={item.description} price={item.price} onPress={() => navigation.navigate("ProductDetail", { id: item.id })} />
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