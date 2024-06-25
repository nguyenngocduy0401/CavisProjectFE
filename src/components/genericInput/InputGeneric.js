import React, { useState } from 'react';
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
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
    secureTextEntry,
    inputContainerStyle,
    containerStyle,
}) {const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)};
    return (
        <Input
            secureTextEntry={secureTextEntry && (!passwordVisible ? true : false)}
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            errorMessage={errorMessage}
            disabled={disabled}
            leftIcon={leftIconName && <Icon name={leftIconName} size={20} />}
            rightIcon={rightIconName && (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon
                        name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                    />
                </TouchableOpacity>
            )}
            containerStyle={[styles.container, containerStyle]}
            inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            disabledInputStyle={styles.disabledStyle}
            errorStyle={styles.errorStyle}
        />
    );
}
const styles = StyleSheet.create({
    container: {
        marginLeft: '2%',
    },
    inputContainerStyle: {
        borderWidth: 1, // Độ dày của đường viền
        borderColor: '#ccc', // Màu của đường viền
        borderRadius: 8, // Độ cong của góc
        paddingHorizontal: '2.6%', // Khoảng cách giữa đường viền và nội dung bên trong
        height: 50,
        width: screenWidth - 40,
    },
    inputStyle: {
        height: '100%',
    },
    labelStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: '2%',
    },
    errorStyle: {
        marginTop: 0,
        marginBottom: 0,
    },
    disabledStyle: {},
})
