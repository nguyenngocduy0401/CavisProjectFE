import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import icon from '../../../assets/icons/check-icon.png'

const screenWidth = Dimensions.get('window').width;

export default function CheckComponent({ image, backgroundColor, checkColor, title, check, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: backgroundColor }, check && { borderWidth: 2, borderColor: checkColor }]}>
            {check &&
                <View style={[styles.icon, { backgroundColor: checkColor }]}>
                    <Image source={icon} style={{ width: 14, height: 14 }} />
                </View>
            }
            <Text style={styles.title}>{title}</Text>
            <Image style={styles.image} source={image} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth / 3 - 20,
        height: screenWidth / 3 - 10,
        borderRadius: 19,
        marginRight: 5,
        marginLeft: 5,
        paddingHorizontal: 10,
    },
    title: {
        textAlign: "left",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        color: "black",
        marginBottom: 5,
    },
    image: {
        width: "75%",
        height: "60%",
        position: "absolute",
        resizeMode: "stretch",
        bottom: 0,
        right: 0,
        borderBottomRightRadius: 16,
    },
    icon: {
        width: 28,
        height: 28,
        position: "absolute",
        left: 0,
        bottom: 0,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    }
})