import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function GenderCheck({ icon, label, active, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={active ? styles.containerActive : styles.container}>
            <Image source={icon} style={styles.icon} />
            <Text style={active ? styles.labelActive : styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderColor: "#E7E3E4",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    },
    containerActive: {
        width: 120,
        height: 120,
        borderColor: "#FBBD98",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    },
    icon: {
        width: 36,
        height: 36,
    },
    label: {
        marginTop: 10,
        fontSize: 16,
    },
    labelActive: {
        marginTop: 10,
        fontSize: 16,
        color: "#DB6464"
    },
});

