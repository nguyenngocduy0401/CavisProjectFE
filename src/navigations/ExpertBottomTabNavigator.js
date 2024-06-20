import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, ActivityIndicator, View, Platform, Text } from 'react-native';


import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { constants } from '../constants/constants';
import Home from '../screens/home/Home';
import ExpertInsights from '../screens/expertInsights/ExpertInsights';
import Account from '../screens/account/Account';

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        elevation: 0,
        height: 66,
        background: "#fff",
    }
}

const ExpertBottomTabNavigator = () => {

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Insights"
                component={ExpertInsights}
                options={{
                    tabBarIcon: ({ focused }) => {
                        let icon = focused == true ? require('../../assets/icons/insights-expert-icon-active.png') : require('../../assets/icons/insights-expert-icon.png');
                        return (
                            <View style={styles.tabBarContainer}>
                                {focused && <View style={styles.tabLabelBarActive}></View>}
                                <Image source={icon} style={styles.tabIcon} />
                                <Text style={focused ? styles.tabLabelActive : styles.tabLabel}>Trang Chủ</Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({ focused }) => {
                        let icon = focused == true ? require('../../assets/icons/account-icon-active.png') : require('../../assets/icons/account-icon.png');
                        return (
                            <View style={styles.tabBarContainer}>
                                {focused && <View style={styles.tabLabelBarActive}></View>}
                                <Image source={icon} style={styles.tabIcon} />
                                <Text style={focused ? styles.tabLabelActive : styles.tabLabel}>Tài khoản</Text>
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default ExpertBottomTabNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24,
    },
    tabLabel: {
        fontSize: 10,
        color: "#6E6E6E",
        fontWeight: '300',
        marginTop: 5,
    },
    tabLabelActive: {
        fontSize: 10,
        color: "#F27272",
        fontWeight: '300',
        marginTop: 5,
    },
    tabBarContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    tabLabelBarActive: {
        backgroundColor: "#F27272",
        width: 48,
        height: 2,
        borderRadius: 4,
        position: "absolute",
        top: -12,
    }
});

