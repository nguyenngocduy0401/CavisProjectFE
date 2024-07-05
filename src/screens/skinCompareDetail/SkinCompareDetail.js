import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import TitleText from '../../components/text/TitleText';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SkinCompareDetail({ route }) {
    const navigation = useNavigation()
    const { skin } = route.params
    return (
        <View style={styles.container}>
            <InsideHeader title={'So sánh làn da'}/>
            <View style={styles.detailContainer}>
                <Image
                    source={{ uri: skin.urlImage }}
                    style={styles.image}
                />
                {skin.date && <TitleText title={format(new Date(skin.date), 'd, MMM yyyy', { locale: vi })} style={styles.title} />}
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