import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import TitleText from '../text/TitleText';
import { Avatar } from '@rneui/themed';
const screenWidth = Dimensions.get('window').width;

export default function MakeupCategory({ icon, title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Avatar
                size={64}
                source={icon}
                containerStyle={styles.iconContainer}
                avatarStyle={styles.avatarStyle}
            />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 72,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        marginTop: 10,
    },
    iconContainer: {
        width: 72,
        height: 72,
        padding: 18,
        backgroundColor: "#fff",
        borderRadius: 100,
        borderColor: "#E7E3E4",
        borderWidth: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
        color: '#6E6E6E',
        textAlign: 'center',
        marginTop: 10,
    },
    avatarStyle: {
        resizeMode: 'contain'
    },
})