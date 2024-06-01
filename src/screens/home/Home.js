import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from '@rneui/themed';
import headerImage from '../../../assets/images/Header-Items.png';
import GenericInput from '../../components/genericInput/InputGeneric';
import GenericButton from '../../components/button/GenericButton';
import { login, register } from '../../services/AuthService';
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as yup from 'yup'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function Home() {

    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const schema = yup.object().shape({
        email: yup.string().required("Email là trường bắt buộc").email('Email có định dạng không hợp lệ!'),
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.topHalf}>
                    <ImageBackground source={headerImage} style={styles.topImage} >
                        <View style={styles.mainTitle}>
                            <Text style={styles.title}>Chào mừng</Text>
                            <Text style={styles.subTitle}>Chào mừng</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.bottomHalf}>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        onSubmit={async (values) => {
                            try {
                                const responseData = await register(values);

                                if (responseData.isSuccess) {

                                    navigation.navigate(registerSceen);
                                } else {
                                    setErrorMessage(responseData.message);
                                }
                            } catch (error) {
                                setErrorMessage(error.message);
                            }
                        }}
                        validationSchema={schema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                


                                

                                <View style={styles.optionsSignUp}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                        <Text style={styles.forgotPassword}><Icon name='arrow-left' />Quay trở lại</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonLogin}>
                                    <GenericButton
                                        title='Xác nhận'
                                        titleStyle={styles.titleStyleButton}
                                        buttonStyle={styles.buttonStyleButton}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
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