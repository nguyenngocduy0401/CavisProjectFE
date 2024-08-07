import { View, Text, Dimensions, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Avatar, Badge, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width

export default function InsideHeader({ title, style }) {
    const navigation = useNavigation()
    return (
        <View style={[styles.container, style]}>
            <Icon
                name='chevron-left'
                type='feather'
                color='black'
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        height: 50,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "black",
        marginLeft: 15,
    }
});

