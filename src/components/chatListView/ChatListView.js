import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, Image } from '@rneui/themed'
import NormalText from '../text/NormalText'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

export default function ChatListView({ user, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Avatar
                rounded
                size={40}
                source={{ uri: user.urlImage }}
                containerStyle={styles.image}
            />
            {user.seen ?
                <View style={styles.descriptionView}>
                    <Text style={styles.title} numberOfLines={1}>{user.fullName}</Text>
                    <NormalText text={user.lastMsg} numberOfLines={1} />
                </View>
                :
                <View style={styles.descriptionView}>
                    <Text style={styles.unseenTitle} numberOfLines={1}>{user.fullName}</Text>
                    <NormalText text={user.lastMsg} numberOfLines={1} style={styles.unseenMessage} />
                </View>}

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
    unseenTitle:{
        color: "black",
        textAlign: "left",
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    unseenMessage:{
        fontWeight: 'bold'
    },
})