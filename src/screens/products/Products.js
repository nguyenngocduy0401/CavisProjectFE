import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductView from '../../components/productView/ProductView';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import { getAnalystProducts } from '../../services/PersonalAnalystService';
import InputGeneric from '../../components/genericInput/InputGeneric';
import SendButton from '../../components/button/SendButton';
import searchIcon from '../../../assets/icons/search-icon.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Products({ route }) {
    const type = route.params?.type
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([])
    async function getProducts() {
        try {
            let data = []
            if (type) {
                data = await getAnalystProducts({
                    Category: type
                })
            } else {
                data = await getAnalystProducts();
            }
            setProducts(data?.data?.items)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    const onRefresh = useCallback(() => {
        try {
            setRefreshing(true);
            getProducts()
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false);
        }
    }, []);
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
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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
        flex: 1,
    },
})