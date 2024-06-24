import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, Image } from '@rneui/themed'
import NormalText from '../text/NormalText'
import { Dimensions } from 'react-native'
import emptyAvatar from '../../../assets/images/empty-avatar.png';

const screenWidth = Dimensions.get('window').width

export default function ChatListView({ item, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Avatar
                rounded
                size={60}
                source={item?.urlImage ? { uri: item.urlImage } : emptyAvatar}
                containerStyle={styles.image}
            />
            <View style={styles.descriptionView}>
                <Text style={styles.title} numberOfLines={1}>{item?.fullName}</Text>
                {item?.lastMessage && <NormalText text={item?.lastMessage} numberOfLines={1} />}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        borderWidth: 1,
        borderColor: '#E7E3E4'
    },
    title: {
        color: "black",
        textAlign: "left",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5,
    },
    descriptionView: {
        marginLeft: 20,
        width: '70%',
    },
    unseenTitle: {
        color: "black",
        textAlign: "left",
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    unseenMessage: {
        fontWeight: 'bold'
    },
})