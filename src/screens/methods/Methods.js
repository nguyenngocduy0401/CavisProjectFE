import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import { getAnalystMethods } from '../../services/PersonalAnalystService';
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
                data = await getAnalystMethods({ Category: type, PageSize: 999 });
            } else {
                data = await getAnalystMethods({ PageSize: 999 });
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
            <InsideHeader title={`Phương pháp ${type ? type.toLowerCase() : 'hữu ích'}`} />
            <FlatList
                style={styles.methodView}
                data={methods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Method key={item.id} method={item} onPress={() => navigation.navigate("MethodDetail", { id: item.id })} />
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