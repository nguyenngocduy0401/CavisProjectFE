import React from 'react'
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width

export default function ButtonLoginGoogle({
    containerStyle,
    titleStyle,
    onPress,
    iconRight,

}) {
    return (

        <Button
            disable
            type='outline'
            icon={<Icon
                name="google"
                size={20}
                color="black"
                marginHorizontal={2}
                style={styles.icon}
              />}
            title='Login Google'
            iconContainerStyle={styles.iconContainerStyle}
            titleStyle={styles.titleStyleButtonGoogle}
            buttonStyle={styles.buttonStyleButtonGoogle}
            onPress={onPress}
            containerStyle={[styles.container, { style: containerStyle }]}
        />

    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 19,
        marginVertical: 10,
    },
    buttonStyleButtonGoogle: {
        borderColor: '#ccc',
        height: 50,
        borderRadius:7,
        borderWidth:1,
    },
    titleStyleButtonGoogle: {
        color: '#777777',
    },
    iconContainerStyle:{
    }
})