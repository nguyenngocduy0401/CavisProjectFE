import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed'
import { format } from 'date-fns'

const screenWidth = Dimensions.get('window').width

export default function TopMethod({ image, title, author, type, date, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{type}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.detailContainer}>
                <View style={styles.author}>
                    <Avatar rounded size={24} source={{ uri: author.avatar }} />
                    <Text style={styles.authorText}>By: <Text style={{ fontWeight: '600', color: 'black' }}>{author.fullName}</Text> </Text>
                </View>
                {date && <Text style={styles.viewText}>{format(new Date(date), 'MMM d, yyyy')}</Text>}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenWidth / 2 + 100,
        paddingLeft: 20,
        paddingRight: 20,
    },
    image: {
        width: '100%',
        height: '70%',
        borderRadius: 16,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorText: {
        textAlign: "left",
        fontSize: 14,
        fontWeight: '300',
        color: "#6E6E6E",
        marginLeft: 5,
    },
    viewText: {
        textAlign: "left",
        fontSize: 12,
        fontWeight: '300',
        color: "#6E6E6E",
        marginLeft: 5,
    },
    viewContainer: {
        flexDirection: 'row'
    },
    title: {
        width: "100%",
        textAlign: "left",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 10,
        color: "black",
        marginBottom: 5,
    },
    tagContainer: {
        width: 60,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#FDF0F0",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 40,
        top: 20,
    },
    tagText: {
        fontSize: 12,
        color: "#F27272",
    }
})