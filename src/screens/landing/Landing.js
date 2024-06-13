import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from "@react-navigation/native"
import logo from '../../../assets/images/cavis-landing-logo.png'

export default function Landing() {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => navigation.replace('Login'), 2500)
    }, [])
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Cavis</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        resizeMode: 'contain'
    },
    title: {
        fontWeight: '600',
        fontSize: 42,
        color: 'white',
        marginTop: 40,
    },
})