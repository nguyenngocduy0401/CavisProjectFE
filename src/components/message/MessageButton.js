import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import emptyAvatar from '../../../assets/images/empty-avatar.png';
import { vi } from 'date-fns/locale';
import { format } from 'date-fns';
import { Avatar } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width

export default function MessageButton({ messageData, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.message}>{messageData.message}</Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row-reverse',
    },
    messageContainer: {
        maxWidth: screenWidth - 90,
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: "#F7F7F7",
    },
    message: {
        color: '#F27272',
        fontSize: 18,
    },
})