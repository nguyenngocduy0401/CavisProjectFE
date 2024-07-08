import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import TitleText from '../../components/text/TitleText';
import usePremium from '../../hooks/usePremium';
import SkinView from '../../components/skinView/SkinView';
import { compareDesc, isToday, parseISO } from 'date-fns';
import { getPhotos } from '../../services/UserService';
import Toast from 'react-native-toast-message';
import { vi } from 'date-fns/locale';

const numCols = 2;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SkinCompare() {
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const isPremiumValid = usePremium()
    const [refreshing, setRefreshing] = useState(false);
    const [days, setDays] = useState([])

    if (!isPremiumValid) {
        navigation.goBack();
        Toast.show({
            type: 'error',
            text1: 'Chức năng này yêu cầu tài khoản premium',
        });
    }
    async function getDays() {
        try {
            const data = await getPhotos()
            const items = data?.data?.items
            if (!items.some(item => isToday(parseISO(item.creationDate)))) {
                const today = {
                    creationDate: new Date().toISOString(),
                    url: null
                }
                items.push(today)
            }
            setDays(items.sort((a, b) => compareDesc(new Date(a.creationDate), new Date(b.creationDate))))
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false);
        }
    }
    useEffect(() => {
        if (isFocused) {
            getDays()
        }
    }, [isFocused])

    const onRefresh = useCallback(() => {
        if (isFocused) {
            getDays()
        }
    }, [isFocused]);
    return (
        <View style={styles.container}>
            <InsideHeader title={'So sánh làn da'} />
            <FlatList
                style={styles.skinView}
                data={days}
                numColumns={numCols}
                keyExtractor={(item) => item.creationDate}
                renderItem={({ item }) => (
                    <SkinView skin={item} onPress={() => navigation.navigate("SkinCompareDetail", { skin: item })} />
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
                        title={'Danh sách trống'}
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
    skinView: {
        padding: 10,
        paddingBottom: 10,
        flex: 1,
    },
})