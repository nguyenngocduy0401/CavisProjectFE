import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import GenericInput from '../../components/genericInput/InputGeneric';
import GenericButton from '../../components/button/GenericButton';
import Toast from "react-native-toast-message";
import * as yup from 'yup'
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import DatePicker from 'react-native-date-picker';
import { fetchUser } from '../../store/features/authSlice';
import { Avatar } from '@rneui/themed';
import emptyAvatar from '../../../assets/images/empty-avatar.png';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import GenderCheck from '../../components/genderCheck/GenderCheck';
import maleIcon from '../../../assets/icons/male-icon.png';
import maleIconActive from '../../../assets/icons/male-icon-active.png';
import femaleIcon from '../../../assets/icons/female-icon.png';
import femaleIconActive from '../../../assets/icons/female-icon-active.png';
import otherGenderIcon from '../../../assets/icons/other-gender-icon.png';
import otherGenderIconActive from '../../../assets/icons/other-gender-icon-active.png';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const screenWidth = Dimensions.get('window').width;

export default function UpdateUser() {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth ? new Date(user.dateOfBirth) : new Date(new Date().setFullYear(new Date().getFullYear() - 12)))
    const [gender, setGender] = useState(user.gender);
    const [image, setImage] = useState(null);
    const schema = yup.object().shape({
        name: yup.string().required("Tên là trường bắt buộc"),
        email: yup.string().required("Email là trường bắt buộc").email('Email có định dạng không hợp lệ!'),
        phoneNumber: yup.string().required("Số điện thoại là trường bắt buộc").matches(/^0[0-9]{9}$/, 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0!'),
    });

    const handleChangeImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            cropperCircleOverlay: true,
            cropping: true,
        }).then(image => {
            setImage(image.path);
        });
    }

    return (
        <ScrollView style={styles.container}>
            <Formik
                initialValues={{
                    name: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                }}
                onSubmit={async (values) => {
                    try {
                        setLoading(true);
                        if (image) {
                            const filename = image.substring(image.lastIndexOf('/') + 1);
                            const fireRef = `user/${user.id}/${filename}`
                            const reference = storage().ref(fireRef);
                            await reference.putFile(image)
                            const urlImage = await storage().ref(fireRef).getDownloadURL();
                            const responseData = await updateUser({ ...values, dateOfBirth, gender, urlImage });

                            if (responseData.isSuccess) {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Thay đổi thông tin thành công',
                                });
                                setErrorMessage(null);
                                dispatch(fetchUser())
                                navigation.goBack()
                            } else {
                                setErrorMessage(responseData.message);
                            }
                        } else {
                            const responseData = await updateUser({ ...values, dateOfBirth, gender });

                            if (responseData.isSuccess) {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Thay đổi thông tin thành công',
                                });
                                setErrorMessage(null);
                                dispatch(fetchUser())
                                navigation.goBack()
                            } else {
                                setErrorMessage(responseData.message);
                            }
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
                        <InsideHeader title={'Chỉnh sửa thông tin'} />
                        <View style={styles.center}>
                            <Avatar onPress={handleChangeImage} size={130} rounded source={image ? { uri: image } : user?.urlImage ? { uri: user.urlImage } : emptyAvatar} containerStyle={styles.avatar} />
                        </View>
                        <GenericInput
                            label="Tên"
                            placeholder="Tên"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            errorMessage={touched.name && errors.name}
                            disabled={loading}
                        />
                        <GenericInput
                            label="Email"
                            placeholder="Email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            errorMessage={touched.email && errors.email}
                            disabled={loading}
                        />
                        <GenericInput
                            label="Số điện thoại"
                            placeholder="Số điện thoại"
                            value={values.phoneNumber}
                            onChangeText={handleChange('phoneNumber')}
                            errorMessage={touched.phoneNumber && errors.phoneNumber}
                            disabled={loading}
                        />
                        <Text style={styles.labelStyle}>Giới tính</Text>
                        <View style={styles.genderAnswers}>
                            <GenderCheck active={gender === 'male'} onPress={() => setGender('male')} label={'Nam'} icon={gender === 'male' ? maleIconActive : maleIcon} />
                            <GenderCheck active={gender === 'female'} onPress={() => setGender('female')} label={'Nữ'} icon={gender === 'female' ? femaleIconActive : femaleIcon} />
                            <GenderCheck active={gender === 'other'} onPress={() => setGender('other')} label={'Khác'} icon={gender === 'other' ? otherGenderIconActive : otherGenderIcon} />
                        </View>
                        <Text style={styles.labelStyle}>Ngày sinh</Text>
                        <View style={styles.center}>
                            <DatePicker locale='vi' maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 12))} style={styles.datePicker} date={dateOfBirth} onDateChange={setDateOfBirth} mode='date' />
                        </View>
                        {errorMessage ? (
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        ) : null}
                        <View style={styles.buttonLogin}>
                            <GenericButton
                                title='Lưu'
                                buttonStyle={styles.buttonStyleButton}
                                onPress={handleSubmit}
                                loading={loading}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonLogin: {
        position: 'relative',
        top: 10,
        height: 90
    },
    buttonStyleButton: {
        height: 50,
        borderWidth: 0,
        borderRadius: 30,
    },
    errorMessage: {
        color: 'red',
        marginLeft: 20,
    },
    avatar: {
        borderWidth: 2,
        borderColor: '#FDD3CA',
        marginBottom: 10,
        marginTop: 5,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelStyle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 20 + screenWidth * 2 / 100,
    },
    genderAnswers: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginBottom: 15,
    },
});