import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function NormalText({ text, color }) {
    return (
        <Text style={[styles.title, {color: color ? color : "#6E6E6E"}]}>{text}</Text>
    )
}
const styles = StyleSheet.create({
    title: {
        textAlign: "left",
        fontSize: 14,
        fontWeight: '300',
    },
})