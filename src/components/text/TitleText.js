import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function TitleText({ title, color, style }) {
    return (
        <Text style={[styles.title, { color: color ? color : "black" }, style]}>{title}</Text>
    )
}
const styles = StyleSheet.create({
    title: {
        textAlign: "left",
        fontSize: 22,
        fontWeight: "600",
        marginTop: 40,
        marginLeft: 40,
        marginBottom: 24,
        width: '100%',
    },
})