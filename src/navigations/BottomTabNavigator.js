import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, ActivityIndicator, View, Platform, Text } from 'react-native';


import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { constants } from '../constants/constants';
import Home from '../screens/home/Home';
import Skincare from '../screens/skincare/Skincare';
import Insights from '../screens/insights/Insights';
import Makeup from '../screens/makeup/Makeup';
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

const BottomTabNavigator = () => {

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        let icon = focused == true ? require('../../assets/icons/home-icon-active.png') : require('../../assets/icons/home-icon.png');
                        return (
                            <View style={styles.tabBarContainer}>
                                {focused && <View style={styles.tabLabelBarActive}></View>}
                                <Image source={icon} style={styles.tabIcon} />
                                <Text style={focused ? styles.tabLabelActive : styles.tabLabel}>Home</Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Skincare"
                component={Skincare}
                options={{
                    tabBarIcon: ({ focused }) => {
                        let icon = focused == true ? require('../../assets/icons/skincare-icon-active.png') : require('../../assets/icons/skincare-icon.png');
                        return (
                            <View style={styles.tabBarContainer}>
                                {focused && <View style={styles.tabLabelBarActive}></View>}
                                <Image source={icon} style={styles.tabIcon} />
                                <Text style={focused ? styles.tabLabelActive : styles.tabLabel}>Skin care</Text>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Insights"
                component={Insights}
                options={{
                    tabBarIcon: ({ focused }) => {
                        let icon = focused == true ? require('../../assets/icons/insights-icon-active.png') : require('../../assets/icons/insights-icon.png');
                        return (
                            <View style={styles.tabBarContainer}>
                                <View style={{
                                    top: -32,
                                    width: 64,
                                    height: 64,
                                    borderRadius: 32,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#FFEFE6"
                                }}>
                                    <View style={{
                                        width: 54,
                                        height: 54,
                                        borderRadius: 27,
                                        backgroundColor: "#F27272",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <Image source={icon} style={styles.tabIcon} />
                                    </View>
                                </View>
                                <Text style={focused ? {
                                    fontSize: 10,
                                    color: "#F27272",
                                    fontWeight: '300',
                                    bottom: 10,
                                    position: "absolute",
                                    bottom: 10,
                                } : {
                                    fontSize: 10,
                                    color: "#6E6E6E",
                                    fontWeight: '300',
                                    position: "absolute",
                                    bottom: 10,
                                }}>Insights</Text>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Makeup"
                component={Makeup}
                options={{
                    tabBarIcon: ({ focused }) => {
                        let icon = focused == true ? require('../../assets/icons/makeup-icon-active.png') : require('../../assets/icons/makeup-icon.png');
                        return (
                            <View style={styles.tabBarContainer}>
                                {focused && <View style={styles.tabLabelBarActive}></View>}
                                <Image source={icon} style={styles.tabIcon} />
                                <Text style={focused ? styles.tabLabelActive : styles.tabLabel}>Make up</Text>
                            </View>
                        )
                    }
                }} />
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
                                <Text style={focused ? styles.tabLabelActive : styles.tabLabel}>Account</Text>
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;

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

