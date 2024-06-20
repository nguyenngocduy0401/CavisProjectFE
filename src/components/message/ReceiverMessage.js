import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import emptyAvatar from '../../../assets/images/empty-avatar.png';
import { vi } from 'date-fns/locale';
import { format } from 'date-fns';
import { Avatar } from '@rneui/themed';

const screenWidth = Dimensions.get('window').width

export default function ReceiverMessage({ user, messageData }) {
    return (
        <View style={styles.container}>
            <Text style={styles.fullName}>{user.fullName}</Text>
            <View style={styles.detailContainer}>
                <Avatar size={40} rounded source={user?.urlImage ? { uri: user.urlImage } : emptyAvatar} containerStyle={styles.avatar} />
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>{messageData.message}</Text>
                    <Text style={styles.date}>{messageData.sendTime && format(new Date(messageData.sendTime), 'HH:mm d, MMM yyyy', { locale: vi })}</Text>
                </View>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    detailContainer: {
        flexDirection: 'row',
    },
    avatar: {
        borderWidth: 1,
        borderColor: '#E7E3E4',
        marginRight: 10
    },
    fullName: {
        fontSize: 16,
        color: "#72777A",
        marginLeft: 50,
    },
    messageContainer: {
        maxWidth: screenWidth - 90,
        padding: 20,
        backgroundColor: "#F7F7F7",
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    message: {
        color: 'black',
        fontSize: 18,
    },
    date: {
        fontSize: 12,
        color: "#72777A",
        marginTop: 5,
    },
})