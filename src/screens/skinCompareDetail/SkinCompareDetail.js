import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import TitleText from '../../components/text/TitleText';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import usePremium from '../../hooks/usePremium';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SkinCompareDetail({ route }) {
    const isPremiumValid = usePremium()
    const navigation = useNavigation()
    const { skin } = route.params
    if (!isPremiumValid) {
        navigation.goBack();
        Toast.show({
            type: 'error',
            text1: 'Chức năng này yêu cầu tài khoản premium',
        });
    }
    return (
        <View style={styles.container}>
            <InsideHeader title={'So sánh làn da'}/>
            <View style={styles.detailContainer}>
                <Image
                    source={{ uri: skin.url }}
                    style={styles.image}
                />
                {skin.creationDate && <TitleText title={format(new Date(skin.creationDate), 'd, MMM yyyy', { locale: vi })} style={styles.title} />}
                {/* <NormalText text={skin.description} /> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    detailContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    image: {
        width: "100%",
        aspectRatio: 0.7,
        borderRadius: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E7E3E4'
    },
    title: {
        marginLeft: 0,
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center'
    },
})