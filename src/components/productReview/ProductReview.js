import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from '@rneui/themed'
import NormalText from '../text/NormalText'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

export default function ProductReview({ image, title, description, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image
                source={{ uri: image }}
                containerStyle={styles.image}
            />
            <Text style={styles.title}>{title}</Text>
            <NormalText text={description}/>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth / 2 - 30,
        padding: 10,
        borderColor: "#E7E3E4",
        borderWidth: 1,
        borderRadius: 16,
        paddingBottom: 15,
        marginLeft: 20,
    },
    image: {
        aspectRatio: 1,
        borderRadius: 11,
    },
    title: {
        color: "black",
        textAlign: "left",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5,
        marginTop: 20,
    }
})