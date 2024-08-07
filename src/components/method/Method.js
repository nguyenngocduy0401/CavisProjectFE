import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get('window').width

export default function Method({ method, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={{ uri: method?.urlImage }} style={styles.image} />
            <View style={{ margin: 10 }}>
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{method?.category}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>{method?.methodName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
    },
    image: {
        width: "40%",
        height: "100%",
        borderRadius: 16,
    },
    title: {
        textAlign: "left",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        color: "black",
        marginBottom: 5,
    },
    tagContainer: {
        width: 60,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#FDF0F0",
        alignItems: "center",
        justifyContent: "center",
    },
    tagText: {
        fontSize: 12,
        color: "#F27272",
    }
})