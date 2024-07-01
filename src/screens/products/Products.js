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
import TitleText from '../../components/text/TitleText';
import usePremium from '../../hooks/usePremium';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Products({ route }) {
    const type = route.params?.type
    const navigation = useNavigation()
    const isPremiumValid = usePremium()
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([])
    const [compatible, setCompatible] = useState(1)
    async function getProducts() {
        console.log(compatible)
        try {
            setRefreshing(true);
            const credential = {}
            if (type) {
                credential.Category = type
            }
            if (compatible) {
                if (compatible === 1) {
                    credential.CompatibleProducts = "Low"
                } else if (compatible === 2) {
                    credential.CompatibleProducts = "Medium"
                } else if (compatible === 3) {
                    credential.CompatibleProducts = "High"
                } else if (compatible === 4) {
                    credential.CompatibleProducts = "Extremely"
                }
            }
            const data = await getAnalystProducts(credential);
            setProducts(data?.data?.items)
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false);
        }
    }
    useEffect(() => {
        getProducts()
    }, [compatible])

    const onRefresh = useCallback(() => {
        getProducts()
    }, [compatible]);
    return (
        <View style={styles.container}>
            <InsideHeader title={'Gợi ý sản phẩm'} />
            {isPremiumValid &&
                <>
                    <TitleText title={'Mức độ phù hợp'}
                        style={{
                            marginLeft: 25,
                            marginBottom: -5,
                            marginTop: 10,
                            fontSize: 20
                        }} />
                    <View style={styles.sliderContainer}>
                        <Slider
                            value={compatible}
                            onValueChange={setCompatible}
                            maximumValue={4}
                            minimumValue={1}
                            step={1}
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
                                    }} text={compatible === 1 ? "Low" : compatible === 2 ? "Medium" : compatible === 3 ? "High" : compatible === 4 && "Extremely"}
                                    />
                                ),
                            }}
                        />
                    </View>
                </>
            }
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
                ListEmptyComponent={
                    <TitleText
                        style={{
                            textAlign: 'center',
                            marginLeft: 0
                        }}
                        title={'Danh sách sản phẩm trống'}
                    />
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
        paddingHorizontal: 25,
        marginBottom: 10,
    }
})