import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import TitleText from '../text/TitleText';
import { Avatar } from '@rneui/themed';
const screenWidth = Dimensions.get('window').width;

export default function HomeTopButton({ icon, backgroundColor, title, onPress, containerStyle, titleStyle, iconStyle }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: backgroundColor }, containerStyle]}>
            <Avatar
                size={64}
                source={icon}
                containerStyle={[styles.iconContainer, iconStyle]}
            />
            {title && <TitleText title={title} style={[styles.title, titleStyle]} />}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth / 2 - 30,
        height: screenWidth / 3,
        borderRadius: 16,
        padding: 16,
        justifyContent: 'space-between',
    },
    iconContainer: {
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 100,
    },
    title: {
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 0,
    }
})