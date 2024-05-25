import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import { Input } from '@rneui/themed';
import headerImage from '../../../assets/images/Header-Items.png';
import LoginInput from '../../components/genericInput/InputGeneric';

const screenWidth = Dimensions.get('window').width;
export default function Login() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

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
        <LoginInput
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setUsername}
        />
        <LoginInput
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          rightIconName= 'eye'
        />
      </View>
      <View style={styles.buttonLogin}>
      <Button  title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth
  },
  mainTitle: {
    paddingLeft : '6%',
    paddingBottom : '4%',
  },
  title: {
    fontSize: 35,
    fontWeight: '500',
    color: 'black',
    marginBottom: '2%',
    marginTop: '15%',
  },
  subTitle: {
    paddingEnd: '27%',
  },
  topHalf: {
    position: 'absolute',
    top: 0,
  },
  topImage: {
    width: screenWidth,
    height: 200,
  },
  bottomHalf: {
    backgroundColor: 'white',
    position: 'relative',
    top: 190,
    borderTopLeftRadius: 13, // Bo tròn góc trên bên trái
    borderTopRightRadius: 13, // Bo tròn góc trên bên phải
  },
  buttonLogin: {
    top: 400,
    position: 'relative',
  }

});