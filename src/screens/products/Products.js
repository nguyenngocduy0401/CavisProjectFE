import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductView from '../../components/productView/ProductView';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import { getAnalystProducts } from '../../services/PersonalAnalystService';
import InputGeneric from '../../components/genericInput/InputGeneric';
import SendButton from '../../components/button/SendButton';
import searchIcon from '../../../assets/icons/search-icon.png';
import { Slider } from '@rneui/themed';
import NormalText from '../../components/text/NormalText';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Products({ route }) {
    const type = route.params?.type
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([])
    const [compatible, setCompatible] = useState("Extremely")
    const convertCompatible = (value) => {
        if (value === 1) {
            return "Low"
        }
        if (value === 2) {
            return "Medium"
        }
        if (value === 3) {
            return "High"
        }
        if (value === 4) {
            return "Extremely"
        }
        if (value === "Low") {
            return 1
        }
        if (value === "Medium") {
            return 2
        }
        if (value === "High") {
            return 3
        }
        if (value === "Extremely") {
            return 4
        }
    }
    async function getProducts() {
        try {
            let data = []
            const credential = null
            if (type) {
                credential.Category = type
            }
            if (compatible) {
                credential.CompatibleProducts = compatible
            }
            data = await getAnalystProducts(credential);
            setProducts(data?.data?.items)
        } catch (error) {
            console.log(error)
        }
    }
    const color = () => {
        let r = interpolate(255, 0);
        let g = interpolate(0, 255);
        let b = interpolate(0, 0);
        return `rgb(${r},${g},${b})`;
    };
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
            <View style={styles.sliderContainer}>
                <Slider
                    value={convertCompatible(compatible)}
                    onValueChange={(value) => setCompatible(convertCompatible(value))}
                    maximumValue={4}
                    minimumValue={1}
                    allowTouchTrack
                    minimumTrackTintColor={"#F27272"}
                    maximumTrackTintColor={"#FBBD98"}
                    trackStyle={{ height: 5, borderRadius: 20 }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: '#F27272' }}
                    thumbTintColor={"#F27272"}
                    thumbProps={{
                        children: (
                            <NormalText style={{
                                width: 80,
                                position: "absolute",
                                left: -30,
                                bottom: -20,
                                textAlign: "center"
                            }} text={compatible} />
                        ),
                    }}
                />
            </View>
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
    sliderContainer: {
        padding: 20,
    }
})