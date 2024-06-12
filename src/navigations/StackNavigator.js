import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import Forget from '../screens/login/Forget';
import Home from '../screens/home/Home';
import BottomTabNavigator from './BottomTabNavigator';
import Questions from '../screens/questions/Questions';
import Products from '../screens/products/Products';
import ProductDetail from '../screens/productDetail/ProductDetail';
import Premium from '../screens/premium/Premium';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/selector';
import { fetchUser } from '../store/features/authSlice';
import Landing from '../screens/landing/Landing';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState(null)
    const user = useSelector(userSelector)
    const fetchToken = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            console.log(accessToken)
            if (accessToken) {
                setAccessToken(accessToken)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useState(() => {
        fetchToken()
    }, [])
    useEffect(() => {
        if (accessToken) {
            dispatch(fetchUser())
        }
    }, [accessToken])
    return (
        <Stack.Navigator initialRouteName={'Landing'}>
            {user?.id ?
                <>
                    <Stack.Screen name="Questions" component={Questions} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Root"
                        component={BottomTabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
                    <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
                    <Stack.Screen name="Premium" component={Premium} options={{ headerShown: false }} />
                </>
                :
                <>
                    <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }} />
                </>}
        </Stack.Navigator >
    )
}

export default StackNavigator;