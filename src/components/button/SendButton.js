import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed';

export default function SendButton({ size, onPress, icon, disabled }) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
            <Avatar size={size ? size : 50} rounded source={icon} containerStyle={styles.avatar} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#F27272',
        padding: 10,
    },
})