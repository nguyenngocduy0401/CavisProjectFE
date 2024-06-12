import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';

export default function SeeAllButton({ onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.text}>Tất cả</Text>
            <Icon
                name='chevron-right'
                type='entypo'
                color='#fff'
                containerStyle={styles.icon}
                iconProps={{ size: 19 }}
            />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    text: {
        color: '#6E6E6E',
        fontSize: 16,
        fontWeight: '300'
    },
    icon: {
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'black',
        marginLeft: 10,
    }
})