import React from 'react'
import { Button, color } from "@rneui/base";
import { Dimensions, StyleSheet } from 'react-native';
const screenWidth = Dimensions.get('window').width

export default function GenericWhiteButton({
    icon,
    title,
    iconContainerStyle,
    containerStyle,
    buttonStyle,
    onPress,
    iconRight,
    disabled,
}) {
    return (
        <Button
            icon={icon}
            title={title}
            iconContainerStyle={{ style: iconContainerStyle }}
            titleStyle={styles.titleStyle}
            buttonStyle={[styles.buttonStyle, buttonStyle]}
            onPress={onPress}
            containerStyle={[styles.container, containerStyle]}
            iconRight={iconRight}
            disabled={disabled}
        />

    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
    titleStyle: {
        color: "black",
    },
    buttonStyle: {
        backgroundColor: "white",
        borderColor: "#E7E3E4",
        borderWidth: 1,
    }
})