import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from '@rneui/themed';
import headerImage from '../../../assets/images/Header-Items.png';
import GenericInput from '../../components/genericInput/InputGeneric';
import GenericCheckbox from '../../components/checkbox/GenericCheckbox';
import GenericButton from '../../components/button/GenericButton';
import ButtonLoginGoogle from '../../components/button/ButtonLoginGoogle';
import { login, register } from '../../services/AuthService';
import Toast from "react-native-toast-message";
import * as yup from 'yup'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { updateUserPassword } from '../../services/UserService';
import InsideHeader from '../../components/insideHeader/InsideHeader';
const screenWidth = Dimensions.get('window').width;
const registerSceen = 'Register';
export default function UpdatePassword() {

    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const schema = yup.object().shape({
        oldPassword: yup.string().required("Mật khẩu hiện tại là trường bắt buộc"),
        newPassword: yup.string().required("Mật khẩu mới là trường bắt buộc").min(6, 'Mật khẩu phải có độ dài ít nhất 6 ký tự!').matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, 'Mật khẩu của bạn phải chứa ít nhất một số và một chữ!'),
        confirmPassword: yup.string().required("Mật khẩu xác nhận là trường bắt buộc").oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận của bạn là sai!')
    });

    return (
        <ScrollView style={styles.container}>
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }}
                onSubmit={async (values) => {
                    try {
                        setLoading(true);
                        const responseData = await updateUserPassword(values);

                        if (responseData.isSuccess) {
                            Toast.show({
                                type: 'success',
                                text1: 'Thay đổi mật khẩu thành công',
                            });
                            setErrorMessage(null);
                            navigation.goBack();
                        } else {
                            setErrorMessage(responseData.message);
                        }
                    } catch (error) {
                        setErrorMessage(error.message);
                    } finally {
                        setLoading(false)
                    }
                }}
                validationSchema={schema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <InsideHeader title={'Thay đổi mật khẩu'} />
                        <GenericInput
                            secureTextEntry={true}
                            label="Mật khẩu hiện tại"
                            placeholder="Mật khẩu hiện tại"
                            value={values.oldPassword}
                            onChangeText={handleChange('oldPassword')}
                            rightIconName='eye-outline'
                            errorMessage={touched.oldPassword && errors.oldPassword}
                            disabled={loading}
                        />
                        <GenericInput
                            secureTextEntry={true}
                            label="Mật khẩu mới"
                            placeholder="Mật khẩu mới"
                            value={values.newPassword}
                            onChangeText={handleChange('newPassword')}
                            rightIconName='eye-outline'
                            errorMessage={touched.newPassword && errors.newPassword}
                            disabled={loading}
                        />
                        <GenericInput
                            secureTextEntry={true}
                            label="Xác nhận mật khẩu"
                            placeholder="Xác nhận mật khẩu"
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            rightIconName='eye-outline'
                            errorMessage={touched.confirmPassword && errors.confirmPassword}
                            disabled={loading}
                        />
                        {errorMessage ? ( // Hiển thị thông báo lỗi dưới trường mật khẩu nếu có lỗi
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        ) : null}
                        <View style={styles.buttonLogin}>
                            <GenericButton
                                title='Lưu'
                                titleStyle={styles.titleStyleButton}
                                buttonStyle={styles.buttonStyleButton}
                                onPress={handleSubmit}
                                loading={loading}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    mainTitle: {
        paddingLeft: '6%',
        paddingBottom: '4%',
    },
    title: {
        fontSize: 33,
        fontWeight: '500',
        color: 'black',
        marginBottom: '2%',
        marginTop: '17%',
    },
    subTitle: {
        fontSize: 16,
        paddingEnd: '34%',
    },
    topHalf: {
    },
    topImage: {
        width: screenWidth,
        height: 210,
    },
    bottomHalf: {
        backgroundColor: 'white',
        position: 'relative',
        top: -30,
        borderTopLeftRadius: 30, // Bo tròn góc trên bên trái
        borderTopRightRadius: 30, // Bo tròn góc trên bên phải
        paddingTop: 30,
    },
    optionsRow: {
        // flexDirection: 'row',
        // justifyContent: 'right',
        alignItems: 'right',
        marginTop: 10,
    },
    forgotPassword: {
        marginRight: 20,
        textAlign: 'right',
        marginLeft: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#333',
        fontSize: 16,
    },
    buttonLogin: {
        position: 'relative',
        top: 10,
        height: 90
    },
    titleProps: {
        fontWeight: '0',
        color: '#808080',
        marginLeft: 6
    },
    titleStyleButton: {

    },
    buttonStyleButton: {
        height: 50,
        borderWidth: 0,
        borderRadius: 30,
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1.5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginHorizontal: 28,
    },
    using: {
        color: 'rgba(0, 0, 0, 0.43)',
        marginHorizontal: 7
    },
    optionsSignUp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingBottom: 40,
    },
    signup: {
        color: '#F27272'
    },
    errorMessage: {
        color: 'red',
        marginLeft: 20,
    },
});