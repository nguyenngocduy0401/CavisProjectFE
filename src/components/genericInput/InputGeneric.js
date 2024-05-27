import React from 'react'
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width

export default function InputGeneric({
    label,
    placeholder,
    value,
    onChangeText,
    errorMessage,
    disabled,
    leftIconName,
    rightIconName,
    width,
    height
}) {
    return (
        <Input
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            errorMessage={errorMessage}
            disabled={disabled}
            leftIcon={leftIconName && <Icon name={leftIconName} size={20} />}
            rightIcon={rightIconName && <Icon name={rightIconName} size={20} />}
            containerStyle={[styles.container, { width: width ? width : screenWidth, height: height ? height : 40 }]}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            disabledInputStyle={styles.disabledStyle}
        />
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: '3%',
        marginTop: '7%',
        marginLeft: '2%',
        
    },
    inputContainerStyle: {
        borderWidth: 1, // Độ dày của đường viền
        borderColor: '#ccc', // Màu của đường viền
        borderRadius: 8, // Độ cong của góc
        paddingHorizontal: '2.6%', // Khoảng cách giữa đường viền và nội dung bên trong
        paddingVertical: '1.7%',// Khoảng cách giữa đường viền và nội dung bên trong
        height: 50,
        width: 410,
    },
    inputStyle: {
    },
    labelStyle: {
        fontSize: 13,
        fontWeight: 'bold', 
        color: '#333',
        marginLeft: '2%',
    },
        
    disabledStyle: {},
})
