import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, Linking, TouchableOpacity, Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import GenericButton from '../../components/button/GenericButton';
import { QR_IMAGE } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import { registerPremium } from '../../services/UserService';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Payment({ route }) {
    const navigation = useNavigation()
    const { premiumPackage } = route.params;
    const user = useSelector(userSelector)
    const handleSubmitPremium = async () => {
        await registerPremium(premiumPackage.id)
        navigation.navigate('Root')
    }
    return (
        <ScrollView style={styles.container}>
            <InsideHeader title={'Premium'} />
            {premiumPackage &&
                <View style={styles.detailContainer}>
                    <Image
                        source={{ uri: QR_IMAGE }}
                        style={styles.image}
                    />
                    <TitleText title={premiumPackage.title} style={styles.title} />
                    <NormalText text={`Vui lòng chuyển khoản với cú pháp:`} />
                    <TouchableOpacity onPress={async () => await Clipboard.setString(`CAVIS + ${user.phoneNumber}`)}>
                        <TitleText title={`CAVIS + ${user.phoneNumber}`} style={styles.price} color={'#DE8186'} />
                    </TouchableOpacity>
                    <NormalText text={`Vui lòng bấm hoàn tất sau khi chuyển khoản. Chúng tôi sẽ xác nhận trong vòng 24h kể từ lúc thanh toán.`} />
                    <GenericButton
                        title={'Hoàn tất'}
                        onPress={handleSubmitPremium}
                        buttonStyle={styles.buttonStyleButton}
                    />
                </View>
            }
        </ScrollView>
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
    brandContainer: {
        width: '100%',
        justifyContent: 'center',
        height: 70,
        paddingBottom: 10,
        borderBottomColor: '#E7E3E4',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    price: {
        marginLeft: 0,
        marginTop: 15,
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        aspectRatio: 0.9,
        borderRadius: 16,
        marginBottom: 20,
    },
    title: {
        marginLeft: 0,
        marginTop: 5,
        marginBottom: 10,
    },
    buttonStyleButton: {
        height: 50,
        borderWidth: 0,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
    },
})