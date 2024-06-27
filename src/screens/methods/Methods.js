import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductView from '../../components/productView/ProductView';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import { getAnalystMethods, getAnalystProducts } from '../../services/PersonalAnalystService';
import InputGeneric from '../../components/genericInput/InputGeneric';
import SendButton from '../../components/button/SendButton';
import searchIcon from '../../../assets/icons/search-icon.png';
import { Slider } from '@rneui/themed';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import Method from '../../components/method/Method';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Methods({ route }) {
    const type = route.params?.type
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const [methods, setMethods] = useState([])
    async function getMethods() {
        try {
            setRefreshing(true);
            let data = []
            if (type) {
                data = await getAnalystMethods({ category: type });
            } else {
                data = await getAnalystMethods(null);
            }
            setMethods(data?.data?.items)
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false);
        }
    }
    useEffect(() => {
        getMethods()
    }, [])

    const onRefresh = useCallback(() => {
        getMethods()
    }, []);
    return (
        <View style={styles.container}>
            <InsideHeader title={'Phương pháp làm đẹp'} />
            <FlatList
                style={styles.methodView}
                data={methods}
                keyExtractor={(item) => item.id}
                renderItem={({ method }) => (
                    <Method key={method.id} image={method.image} title={method.title} type={method.type} onPress={() => navigation.navigate("MethodDetail", { id: method.id })} />
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
                        title={'Danh sách phương pháp trống'}
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
    methodView: {
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
    },
})