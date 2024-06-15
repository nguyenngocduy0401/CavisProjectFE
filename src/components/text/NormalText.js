import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function NormalText({ text, color, style }) {
    return (
        <Text style={[styles.title, {color: color ? color : "#6E6E6E"}, style]}>{text}</Text>
    )
}
const styles = StyleSheet.create({
    title: {
        textAlign: "left",
        width: '100%',
    },
})