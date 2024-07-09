import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function QuestionAnswerCheck({disabled, label, active, onPress, width, height }) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[active ? styles.containerActive : styles.container, { width: width ? width : 'auto', height: height ? height : 50}]}>
            <Text style={active ? styles.labelActive : styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        borderColor: "#E7E3E4",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    },
    containerActive: {
        borderColor: "#FBBD98",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    },
    label: {
        width: '100%',
        fontSize: 16,
        color: "#262626",
        textAlign: "left",
        marginLeft: 28,
    },
    labelActive: {
        fontSize: 16,
        color: "#DB6464",
        textAlign: "left",
        width: '100%',
        marginLeft: 28,
    },
});

