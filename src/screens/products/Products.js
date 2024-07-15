import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductView from '../../components/productView/ProductView';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import { getAnalystProducts } from '../../services/PersonalAnalystService';
import SendButton from '../../components/button/SendButton';
import filterIcon from '../../../assets/icons/filter-icon.png';
import { BottomSheet, Slider } from '@rneui/themed';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import usePremium from '../../hooks/usePremium';
import QuestionAnswerCheck from '../../components/questionAnswerCheck/QuestionAnswerCheck';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const categoriesData = [
    {
        id: "839dc6d7-4b15-479b-9e01-17b8d3303144",
        productCategoryName: "Nước tẩy trang",
        type: "Skincare"
    },
    {
        id: "9dba7949-edd0-469a-9ee2-225a864ede5b",
        productCategoryName: "Kem lót",
        type: "Makeup"
    },
    {
        id: "f301d7ab-8c96-4f4b-8b34-5bd8bd2f3798",
        productCategoryName: "Phấn má",
        type: "Makeup"
    },
    {
        id: "005eb795-d06e-4a1a-b828-87fb00b9e919",
        productCategoryName: "Kem dưỡng đêm",
        type: "Skincare"
    },
    {
        id: "30e2e877-861b-4ae5-8a6b-b2e93a79175e",
        productCategoryName: "Toner",
        type: "Skincare"
    },
    {
        id: "d7114e75-445e-411f-85cc-c2ad4b0ca65c",
        productCategoryName: "Kem nền",
        type: "Makeup"
    },
    {
        id: "786b79fb-576a-4999-bf57-ce5ff3792ef6",
        productCategoryName: "Cushion",
        type: "Makeup"
    },
    {
        id: "c45b4c4a-eefe-4295-8110-e9bed75273d9",
        productCategoryName: "Serum",
        type: "Skincare"
    },
    {
        id: "39201e62-9ce1-45cc-9625-ee52babc780d",
        productCategoryName: "Kem chống nắng",
        type: "Skincare"
    },
    {
        id: "5e500a0f-e114-4f88-95d1-f1b12fba0654",
        productCategoryName: "Sữa rửa mặt",
        type: "Skincare"
    }
]

export default function Products({ route }) {
    const type = route.params?.type
    const navigation = useNavigation()
    const isPremiumValid = usePremium()
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(route.params?.category)
    const [isShowCategories, setIsShowCategories] = useState(false)
    const [compatible, setCompatible] = useState(1)
    async function getCategories() {
        if (type) {
            const data = categoriesData.filter(c => c.type === type)
            setCategories(data)
        } else {
            setCategories(categoriesData)
        }
    }
    async function getProducts() {
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
            if (category) {
                credential.CategoryId = category
            }
            credential.PageSize = 999
            const data = await getAnalystProducts(credential);
            setProducts(data?.data?.items)
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false);
        }
    }
    const toggleCategory = (id) => {
        if (category === id) {
            setCategory(null)
        } else {
            setCategory(id)
        }
        setIsShowCategories(false)
    };
    useEffect(() => {
        getCategories()
    }, [])
    useEffect(() => {
        getProducts()
    }, [compatible, category])

    const onRefresh = useCallback(() => {
        getProducts()
    }, [compatible, category]);
    return (
        <View style={styles.container}>
            <InsideHeader title={`Gợi ý sản phẩm ${type ? type.toLowerCase() : ''}`} />
            <>
                {isPremiumValid && type !== "Makeup" &&
                    <TitleText title={'Mức độ phù hợp'}
                        style={{
                            marginLeft: 20,
                            marginBottom: -5,
                            marginTop: 10,
                            fontSize: 20
                        }} />
                }
                <View style={styles.filterContainer}>
                    {isPremiumValid && type !== "Makeup" ?
                        <Slider
                            style={styles.slider}
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
                                        width: 90,
                                        position: "absolute",
                                        left: -35,
                                        bottom: -20,
                                        textAlign: "center"
                                    }} text={compatible === 1 ? "Thấp" : compatible === 2 ? "Bình thường" : compatible === 3 ? "Cao" : compatible === 4 && "Phù hợp nhất"}
                                    />
                                ),
                            }}
                        /> : <View style={{ width: '90%' }} />
                    }
                    <SendButton size={40} icon={filterIcon} onPress={() => setIsShowCategories(true)} />
                </View>
            </>
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
                        title={'Không tìm thấy sản phẩm phù hợp'}
                    />
                }
            />
            <BottomSheet onBackdropPress={() => setIsShowCategories(false)} isVisible={isShowCategories}>
                <View style={styles.bottomSheetStyle}>
                    <TitleText style={{ marginLeft: 20 }} title="Danh mục sản phẩm" />
                    <View style={styles.categoriesContainer}>
                        {categories.length > 0 && categories.map((c) =>
                            <QuestionAnswerCheck
                                key={c.id}
                                active={c.id === category}
                                onPress={() => toggleCategory(c.id)}
                                label={c.productCategoryName}
                            />
                        )}
                    </View>
                </View>
            </BottomSheet>
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
    categoriesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomSheetStyle: {
        minHeight: screenHeight / 10 * 4,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: 'white',
        paddingBottom: 40,
    },
    slider: {
        width: '80%'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
    }
})