import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from '@rneui/themed';
import headerImage from '../../../assets/images/Header-Items.png';
import GenericInput from '../../components/genericInput/InputGeneric';
import GenericButton from '../../components/button/GenericButton';
import { sendOTP, resetPassword } from '../../services/AuthService';
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as yup from 'yup'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function Forget() {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const schemaStep1 = yup.object().shape({
        email: yup.string().required("Email là trường bắt buộc").email('Email có định dạng không hợp lệ!'),
    });
    const schemaStep2 = yup.object().shape({
        otp: yup.string().required("OTP là trường bắt buộc").matches(/^\d{6}$/, 'OTP phải có 6 chữ số'),
        newPassword: yup.string().required("Mật khẩu là trường bắt buộc").min(6, 'Mật khẩu phải có độ dài ít nhất 6 ký tự!').matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, 'Mật khẩu của bạn phải chứa ít nhất một số và một chữ!'),
        confirmPassword: yup.string().required("Mật khẩu xác nhận là trường bắt buộc").oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận của bạn là sai!')
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.topHalf}>
                    <ImageBackground source={headerImage} style={styles.topImage} >
                        <View style={styles.mainTitle}>
                            <Text style={styles.title}>Quên mật khẩu</Text>
                            <Text style={styles.subTitle}>Vui lòng nhập email bên dưới để lấy lại mật khẩu của bạn</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.bottomHalf}>
                    {step === 1 && <Formik
                        initialValues={{
                            email: '',
                        }}
                        onSubmit={async (values) => {
                            try {
                                setLoading(true)
                                const responseData = await sendOTP(values);
                                if (responseData.isSuccess && responseData.data) {
                                    setEmail(values.email);
                                    setErrorMessage(null);
                                    setStep(2);
                                } else if (responseData.isSuccess && !responseData.data) {
                                    setErrorMessage(responseData.message);
                                } else {
                                    setErrorMessage("Không thể gửi OTP! Xin vui lòng thử lại sau.");
                                }
                            } catch (error) {
                                console.log(error.message);
                                setErrorMessage("Không thể gửi OTP! Xin vui lòng thử lại sau.");
                            } finally {
                                setLoading(false)
                            }
                        }}
                        validationSchema={schemaStep1}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <GenericInput
                                    label="Email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    errorMessage={touched.email && errors.email}
                                    disabled={loading}
                                />


                                {errorMessage ? ( // Hiển thị thông báo lỗi dưới trường mật khẩu nếu có lỗi
                                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                                ) : null}

                                <View style={styles.optionsSignUp}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login') && setErrorMessage(null)} disabled={loading}>
                                        <Text style={styles.forgotPassword}><Icon name='arrow-left' />Quay trở lại</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonLogin}>
                                    <GenericButton
                                        title='Xác nhận'
                                        titleStyle={styles.titleStyleButton}
                                        buttonStyle={styles.buttonStyleButton}
                                        onPress={handleSubmit}
                                        loading={loading}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>}
                    {step === 2 && <Formik
                        initialValues={{
                            email: email,
                            otp: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        onSubmit={async (values) => {
                            try {
                                setLoading(true)
                                const responseData = await resetPassword(values);

                                if (responseData.isSuccess && responseData.data) {
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Đổi mật khẩu thành công',
                                        text2: 'Bạn đã thay đổi mật khẩu thành công. Hãy đăng nhập!',
                                    });
                                    setErrorMessage(null);
                                    navigation.navigate('Login');
                                } else if (responseData.isSuccess && !responseData.data) {
                                    setErrorMessage(responseData.message);
                                } else {
                                    setErrorMessage("Không thể đổi mật khẩu vui lòng thử lại sau!");
                                }
                            } catch (error) {
                                console.log(error.message);
                                setErrorMessage("Không thể đổi mật khẩu vui lòng thử lại sau!");
                            } finally {
                                setLoading(false)
                            }
                        }}
                        validationSchema={schemaStep2}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <GenericInput
                                    label="OTP"
                                    placeholder="OTP"
                                    value={values.otp}
                                    onChangeText={handleChange('otp')}
                                    errorMessage={touched.otp && errors.otp}
                                    disabled={loading}
                                />
                                <GenericInput
                                    secureTextEntry={true}
                                    label="Mật khẩu mới"
                                    placeholder="Mật khẩu mới"
                                    rightIconName='eye-outline'
                                    value={values.newPassword}
                                    onChangeText={handleChange('newPassword')}
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

                                <View style={styles.optionsSignUp}>
                                    <TouchableOpacity onPress={() => setStep(1) && setErrorMessage(null)} disabled={loading}>
                                        <Text style={styles.forgotPassword}><Icon name='arrow-left' />Quay trở lại</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonLogin}>
                                    <GenericButton
                                        title='Xác nhận'
                                        titleStyle={styles.titleStyleButton}
                                        buttonStyle={styles.buttonStyleButton}
                                        onPress={handleSubmit}
                                        loading={loading}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>}
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 1000,
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
        position: 'absolute',
        top: 0,
    },
    topImage: {
        width: screenWidth,
        height: 210,
    },
    bottomHalf: {
        backgroundColor: 'white',
        position: 'relative',
        top: 180,
        borderTopLeftRadius: 30, // Bo tròn góc trên bên trái
        borderTopRightRadius: 30, // Bo tròn góc trên bên phải
        paddingTop: 30,
        height: screenHeight
    },
    optionsRow: {
        // flexDirection: 'row',
        // justifyContent: 'right',
        alignItems: 'right',
        marginTop: 10,
    },
    forgotPassword: {
        marginRight: 20,
        textAlign: 'left',
        marginLeft: 20,
        marginTop: 10,
        fontWeight: '300',
        color: '#F27272',
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
    signup: {
        color: '#F27272'
    },
    errorMessage: {
        color: 'red',
        marginLeft: 20,
    },
});