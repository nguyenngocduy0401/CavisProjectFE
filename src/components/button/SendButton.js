import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import sendIcon from '../../../assets/icons/send-icon.png';
import { Avatar } from '@rneui/themed';

export default function SendButton({ onPress, disabled }) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
            <Avatar size={50} rounded source={sendIcon} containerStyle={styles.avatar} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#F27272',
        padding: 10,
    },
})