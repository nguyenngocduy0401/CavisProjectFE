import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import Forget from '../screens/login/Forget';
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator >
    )
}

export default StackNavigator;