import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/themed';
import headerImage from '../../../assets/images/Header-Items.png';
import GenericInput from '../../components/genericInput/InputGeneric';
import GenericCheckbox from '../../components/checkbox/GenericCheckbox';
import GenericButton from '../../components/button/GenericButton';
import ButtonLoginGoogle from '../../components/button/ButtonLoginGoogle';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Login() {

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);

  const handleLogin = () => {
    // Add login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    console.log('Forgot Password pressed');
  };

  const toggleCheckbox = () => setChecked(!checked);
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <ImageBackground source={headerImage} style={styles.topImage} >
          <View style={styles.mainTitle}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subTitle}>Welcome back. Enter your credentials to access your account</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bottomHalf}>
        <GenericInput
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setUsername}
        />
        <GenericInput
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          rightIconName='eye-outline'
        />
        <View style={styles.optionsRow}>

          <GenericCheckbox
            title='Keep me signed in'
            checked={checked}
            onPress={toggleCheckbox}
            iconType='material-community'
            checkedIcon='checkbox-marked'
            uncheckedIcon='checkbox-blank-outline'
            checkedColor='#DE8186'
            titleProps={styles.titleProps}
          />

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.buttonLogin}>
          <GenericButton
            title='SIGN IN'
            titleStyle={styles.titleStyleButton}
            buttonStyle={styles.buttonStyleButton}
            onPress={handleLogin}
          />
        </View>

        <View style={styles.options}>
          <View style={styles.line} />
          <Text style={styles.using}>Or Sign In using</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.buttonLogin}>
          <ButtonLoginGoogle
            onPress={handleForgotPassword}
          />
        </View>
        <View style={styles.optionsSignUp}>
        <Text >Don't have an Account? </Text>
          <TouchableOpacity >
            <Text style={styles.signup}>Sign Up here</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth
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
    height: screenHeight
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPassword: {
    marginRight: 20,
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
  optionsSignUp:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signup:{
    color:'#F27272'
  },
});