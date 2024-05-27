import React from 'react'
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const screenWidth = Dimensions.get('window').width

export default function GenericButton({
    icon,
    title,
    iconContainerStyle,
    containerStyle,
    titleStyle,
    buttonStyle,
    onPress,
    iconRight,
}) {
    return (
        
            <Button
                ViewComponent={LinearGradient}
                linearGradientProps={{
                    colors: ["#F27272", "#FBBD98"],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                  }}
                icon={icon}
                title={title}
                iconContainerStyle={{ style: iconContainerStyle }}
                titleStyle={titleStyle}
                buttonStyle={buttonStyle}
                onPress={onPress}
                containerStyle={[styles.container, { style: containerStyle }]}
                iconRight={iconRight}
            />
        
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 19,
        marginVertical: 10,
    },

})