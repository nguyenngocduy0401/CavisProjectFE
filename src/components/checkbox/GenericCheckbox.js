import React from 'react'
import { CheckBox } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width

export default function GenericCheckbox({
    title,
    checkedColor,
    checkedIcon,
    uncheckedIcon,
    iconType,
    onPress,
    checked,
    titleProps
}) {
    return (
        <CheckBox
            title={title}
            size={20}
            checked={checked}
            checkedColor={checkedColor}
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
            iconType={iconType}
            onPress={onPress}
            containerStyle={styles.checkboxContainer}
            titleProps={{ style: titleProps }}
        />
    );
}
const styles = StyleSheet.create({
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginTop: 10 ,
        marginLeft: 20,
      },
      
});