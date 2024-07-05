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
import { fetchUser, removeUser } from '../store/features/authSlice';
import Landing from '../screens/landing/Landing';
import Payment from '../screens/payment/Payment';
import MethodDetail from '../screens/methodDetail/MethodDetail';
import Chat from '../screens/chat/Chat';
import ExpertBottomTabNavigator from './ExpertBottomTabNavigator';
import ChatList from '../screens/chatList/ChatList';
import Methods from '../screens/methods/Methods';
import SkincareRoutine from '../screens/skincareRoutine/SkincareRoutine';
import CameraOpen from '../screens/cameraOpen/CameraOpen';
import SkinCompare from '../screens/skinCompare/SkinCompare';
import SkinCompareDetail from '../screens/skinCompareDetail/SkinCompareDetail';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState(null)
    const user = useSelector(userSelector)
    const fetchToken = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            console.log('Access token: ' + accessToken)
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
        } else {
            dispatch(removeUser())
        }
    }, [accessToken])
    return (
        <Stack.Navigator initialRouteName={'Landing'}>
            {user?.id ?
                (user.role.toLowerCase() === 'customer' ?
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
                        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
                        <Stack.Screen name="Methods" component={Methods} options={{ headerShown: false }} />
                        <Stack.Screen name="MethodDetail" component={MethodDetail} options={{ headerShown: false }} />
                        <Stack.Screen name="ChatList" component={ChatList} options={{ headerShown: false }} />
                        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                        <Stack.Screen name="SkincareRoutine" component={SkincareRoutine} options={{ headerShown: false }} />
                        <Stack.Screen name="SkinCompare" component={SkinCompare} options={{ headerShown: false }} />
                        <Stack.Screen name="CameraOpen" component={CameraOpen} options={{ headerShown: false }} />
                        <Stack.Screen name="SkinCompareDetail" component={SkinCompareDetail} options={{ headerShown: false }} />
                    </>
                    : user.role.toLowerCase().includes('expert') &&
                    <>
                        <Stack.Screen
                            name="Root"
                            component={ExpertBottomTabNavigator}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="ChatList" component={ChatList} options={{ headerShown: false }} />
                        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                    </>
                )
                :
                <>
                    <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }} />
                </>
            }
        </Stack.Navigator >
    )
}

export default StackNavigator;