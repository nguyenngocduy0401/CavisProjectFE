import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import TitleText from '../../components/text/TitleText';
import usePremium from '../../hooks/usePremium';
import SkinView from '../../components/skinView/SkinView';
import { compareDesc, isToday, parseISO } from 'date-fns';
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
    async function getDays() {
        try {
            const data = {
                data: {
                    items: [
                        {
                            date: "2024-06-27T18:37:21.566Z",
                            urlImage: "https://firebasestorage.googleapis.com/v0/b/cavisproject.appspot.com/o/skincheck%2Fbcf8bd91-61ed-4672-a2ba-4ece23f25236%2Fmrousavy-7764879245349578851.jpg?alt=media&token=d55e8e8c-d269-498b-ad8b-be68b2bf523d"
                        },
                        {
                            date: "2024-06-28T18:37:21.566Z",
                            urlImage: "https://firebasestorage.googleapis.com/v0/b/cavisproject.appspot.com/o/skincheck%2Fbcf8bd91-61ed-4672-a2ba-4ece23f25236%2Fmrousavy-7764879245349578851.jpg?alt=media&token=d55e8e8c-d269-498b-ad8b-be68b2bf523d"
                        },
                        {
                            date: "2024-06-29T18:37:21.566Z",
                            urlImage: "https://firebasestorage.googleapis.com/v0/b/cavisproject.appspot.com/o/skincheck%2Fbcf8bd91-61ed-4672-a2ba-4ece23f25236%2Fmrousavy-7764879245349578851.jpg?alt=media&token=d55e8e8c-d269-498b-ad8b-be68b2bf523d"
                        },
                        {
                            date: "2024-06-30T18:37:21.566Z",
                            urlImage: "https://firebasestorage.googleapis.com/v0/b/cavisproject.appspot.com/o/skincheck%2Fbcf8bd91-61ed-4672-a2ba-4ece23f25236%2Fmrousavy-7764879245349578851.jpg?alt=media&token=d55e8e8c-d269-498b-ad8b-be68b2bf523d"
                        },
                        {
                            date: "2024-07-01T18:37:21.566Z",
                            urlImage: "https://firebasestorage.googleapis.com/v0/b/cavisproject.appspot.com/o/skincheck%2Fbcf8bd91-61ed-4672-a2ba-4ece23f25236%2Fmrousavy-7764879245349578851.jpg?alt=media&token=d55e8e8c-d269-498b-ad8b-be68b2bf523d"
                        },
                    ]
                }
            };
            const items = data?.data?.items
            if (!items.some(item => isToday(parseISO(item.date)))) {
                const today = {
                    date: new Date().toISOString(),
                    urlImage: null
                }
                items.push(today)
            }
            setDays(items.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))))
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
                keyExtractor={(item) => item.date}
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