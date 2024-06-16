import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from '@rneui/themed'
import NormalText from '../text/NormalText'
import { Dimensions } from 'react-native'
import { truncateText } from '../../utils/utils'

const screenWidth = Dimensions.get('window').width

export default function ProductView({ image, title, price, description, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image
                source={{ uri: image }}
                containerStyle={styles.image}
            />
            <View style={styles.descriptionView}>
                <Text style={styles.title}>{truncateText(title, 25)}</Text>
                <NormalText text={truncateText(description, 75)} />
                <Text style={styles.price}>{price && price.toLocaleString()}₫</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        aspectRatio: 1,
        borderRadius: 16,
        width: screenWidth / 4,
        borderWidth: 1,
        borderColor: '#E7E3E4'
    },
    title: {
        color: "black",
        textAlign: "left",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5,
    },
    price: {
        color: "black",
        textAlign: "left",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        marginTop: 10,
    },
    descriptionView: {
        marginLeft: 20,
        width: '70%',
    }
})