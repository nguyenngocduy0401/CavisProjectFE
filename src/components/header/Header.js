import { View, Text, Dimensions, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Avatar, Badge } from '@rneui/themed';
import headerLogo from '../../../assets/images/cavis-horizontal-logo.png';
import notificationIcon from '../../../assets/icons/notification-icon.png';
import chatIcon from '../../../assets/icons/chat-icon.png';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';

const screenWidth = Dimensions.get('window').width

export default function Header() {
    const navigation = useNavigation()
    const user = useSelector(userSelector)
    const [notificationsNumber, setNotificationsNumber] = useState(null);
    const [chatNumber, setChatNumber] = useState(null);
    async function getNotificationNumber() {
        try {
            // const data = await getSkins();
            setNotificationsNumber(2)
        } catch (error) {
            console.log(error)
        }
    }
    async function getChatNumber() {
        try {
            // const data = await getSkins();
            setChatNumber(0)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getNotificationNumber()
        getChatNumber()
    }, [])
    return (
        <View style={styles.container}>
            <Image source={headerLogo} style={styles.topLogo} />
            <View style={styles.interactContainer}>
                {/* <TouchableOpacity onPress={() => console.log("navigate notification screen")}>
                    <Avatar
                        size={45}
                        rounded
                        source={notificationIcon}
                        containerStyle={styles.notificationContainer}
                    />
                    {notificationsNumber !== null && notificationsNumber !== 0 &&
                        <Badge
                            badgeStyle={styles.badgeStyle}
                            containerStyle={styles.badgeContainer}
                            value={notificationsNumber}
                        />
                    }
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>
                    <Avatar
                        size={45}
                        rounded
                        source={chatIcon}
                        containerStyle={styles.notificationContainer}
                    />
                    {chatNumber !== null && chatNumber !== 0 &&
                        <Badge
                            badgeStyle={styles.badgeStyle}
                            containerStyle={styles.badgeContainer}
                            value={chatNumber}
                        />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        height: 50,
        alignItems: "center",
    },
    topLogo: {
        width: 122,
        height: 32,
    },
    notificationContainer: {
        borderColor: '#E7E3E4',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 12,
    },
    badgeContainer: {
        position: 'absolute',
        top: 0,
        right: -5,
    },
    badgeStyle: {
        backgroundColor: '#F27272'
    },
    interactContainer: {
        flexDirection: 'row',
        gap: 10,
    }
});

