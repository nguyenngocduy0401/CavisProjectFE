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
const screenWidth = Dimensions.get('window').width;
const registerSceen = 'Register';
export default function Register() {

  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const schema = yup.object().shape({
    userName: yup.string().required("Tài khoản là trường bắt buộc"),
    name: yup.string().required("Tên là trường bắt buộc"),
    email: yup.string().required("Email là trường bắt buộc").email('Email có định dạng không hợp lệ!'),
    phoneNumber: yup.string().required("Số điện thoại là trường bắt buộc").matches(/^0[0-9]{9}$/, 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0!'),
    password: yup.string().required("Mật khẩu là trường bắt buộc").min(6, 'Mật khẩu phải có độ dài ít nhất 6 ký tự!').matches(/[0-9]+/, 'Mật khẩu của bạn phải chứa ít nhất một số!'),
    passwordConfirm: yup.string().required("Mật khẩu xác nhận là trường bắt buộc").oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận của bạn là sai!')
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.topHalf}>
          <ImageBackground source={headerImage} style={styles.topImage} >
            <View style={styles.mainTitle}>
              <Text style={styles.title}>Đăng kí</Text>
              <Text style={styles.subTitle}>Chào mừng! Nhập thông tin cần thiết để tạo tài khoản mới</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.bottomHalf}>
          <Formik
            initialValues={{
              userName: '',
              name: '',
              email: '',
              phoneNumber: '',
              password: '',
              passwordConfirm: ''
            }}
            onSubmit={async (values) => {
              try {
                const responseData = await register(values);

                if (responseData.isSuccess) {
                  Toast.show({
                    type: 'success',
                    text1: 'Đăng ký thành công',
                    text2: 'Bạn đã đăng ký thành công. Hãy đăng nhập!',
                  });
                  navigation.navigate('Login');
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
                <GenericInput
                  label="Tài khoản"
                  placeholder="Tài khoản"
                  value={values.userName}
                  onChangeText={handleChange('userName')}
                  errorMessage={touched.userName && errors.userName}
                />
                <GenericInput
                  label="Tên"
                  placeholder="Tên"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  errorMessage={touched.name && errors.name}
                />
                <GenericInput
                  label="Email"
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  errorMessage={touched.email && errors.email}
                />
                <GenericInput
                  label="Số điện thoại"
                  placeholder="Số điện thoại"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  errorMessage={touched.phoneNumber && errors.phoneNumber}
                />
                <GenericInput
                  secureTextEntry={true}
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  rightIconName='eye-outline'
                  errorMessage={touched.password && errors.password}
                />
                <GenericInput
                  secureTextEntry={true}
                  label="Xác nhận mật khẩu"
                  placeholder="Xác nhận mật khẩu"
                  value={values.passwordConfirm}
                  onChangeText={handleChange('passwordConfirm')}
                  rightIconName='eye-outline'
                  errorMessage={touched.passwordConfirm && errors.passwordConfirm}
                />
                {errorMessage ? ( // Hiển thị thông báo lỗi dưới trường mật khẩu nếu có lỗi
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
                <View style={styles.buttonLogin}>
                  <GenericButton
                    title='Đăng kí'
                    titleStyle={styles.titleStyleButton}
                    buttonStyle={styles.buttonStyleButton}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
          <View style={styles.optionsRow}>
          </View>
          <View style={styles.options}>
            <View style={styles.line} />
            <Text style={styles.using}>Đăng kí bằng cách khác</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.buttonLogin}>
            <ButtonLoginGoogle

            />
          </View>
          <View style={styles.optionsSignUp}>
            <Text >Đã có tài khoản? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} >
              <Text style={styles.signup}>Đăng nhập tại đây!</Text>
            </TouchableOpacity>
          </View>
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