import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useNavigation } from '@react-navigation/native'
import SendButton from '../button/SendButton'
import plusIcon from '../../../assets/icons/plus-icon.png';
import plusImage from '../../../assets/images/carousel-image-2.png';

const screenWidth = Dimensions.get('window').width

export default function SkinView({ skin, onPress }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {skin.urlImage
                ? <Image source={{ uri: skin?.urlImage }} style={styles.image} />
                : <TouchableOpacity style={styles.openCamera} onPress={() => navigation.navigate("CameraOpen")} >
                    <ImageBackground style={styles.plusBackground} source={plusImage} />
                    <SendButton icon={plusIcon} onPress={() => navigation.navigate("CameraOpen")} />
                </TouchableOpacity>
            }
            {skin?.date && <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{format(new Date(skin.date), 'd, MMM yyyy', { locale: vi })}</Text>
            </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth / 2 - 30,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
    },
    image: {
        width: "100%",
        aspectRatio: 0.7,
        borderRadius: 8,
    },
    plusBackground: {
        width: "100%",
        height: "100%",
        opacity: 0.7,
        position: 'absolute',
    },
    openCamera: {
        width: "100%",
        aspectRatio: 0.7,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#E7E3E4",
        justifyContent: "center",
        alignItems: "center",
    },
    tagContainer: {
        width: 100,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#FDF0F0",
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: 10,
        left: 10,
    },
    tagText: {
        fontSize: 12,
        color: "#F27272",
    }
})