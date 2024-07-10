import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_LINK } from '../../config/firebase/realtimedb';
import { userSelector } from '../../store/selector';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import ChatListView from '../../components/chatListView/ChatListView';
import { useNavigation } from '@react-navigation/native';
import TitleText from '../../components/text/TitleText';
import { Tab } from '@rneui/themed';
import { compareDesc, parseISO } from 'date-fns';
import usePremium from '../../hooks/usePremium';

const tabs = [
    {
        value: 0,
        title: 'Đang trò chuyện',
    },
    {
        value: 1,
        title: 'Chưa trò chuyện'
    },
]

export default function ChatList() {
    const user = useSelector(userSelector);
    const navigation = useNavigation()
    const isPremiumValid = usePremium()
    const [chatList, setChatList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [tab, setTab] = useState(0);

    if (!isPremiumValid) {
        navigation.goBack();
        Toast.show({
            type: 'error',
            text1: 'Chức năng này yêu cầu tài khoản premium',
        });
    }

    const getChatList = (usersData) => {
        const chatListRef = firebase
            .app()
            .database(DATABASE_LINK)
            .ref('/chatlist/' + user?.id)
        const onValueChange = chatListRef.on('value', snapshot => {
            if (usersData) {
                let chatList = []
                if (snapshot.val()) {
                    const data = Object.values(snapshot.val())
                    chatList = data?.sort((a, b) => compareDesc(parseISO(a.timestamp), parseISO(b.timestamp))).map(chat => {
                        const user = usersData.find(user => user.id === chat.id);
                        return { ...chat, ...user };
                    })
                }
                setChatList(chatList)
            }
        });
        return () => {
            chatListRef.off('value', onValueChange);
        };
    }
    const getExpertList = (usersData) => {
        const chatListRef = firebase
            .app()
            .database(DATABASE_LINK)
            .ref('/chatlist/' + user?.id)
        const onValueChange = chatListRef.on('value', snapshot => {
            if (usersData) {
                let chatList = []
                if (snapshot.val()) {
                    const data = Object.values(snapshot.val())
                    chatList = usersData.filter(userData => (!data.some(chat => chat.id === userData.id) && userData.role.toLowerCase().includes('expert') && userData.id !== user.id))
                } else {
                    chatList = usersData.filter(userData => userData.id !== user.id && userData.role.toLowerCase().includes('expert'))
                }
                setChatList(chatList)
            }
        });
        return () => {
            chatListRef.off('value', onValueChange);
        };
    }
    useEffect(() => {
        let cleanup = () => { };

        fetchAllUsers().then((usersData) => {
            if (tab === 0) {
                cleanup = getChatList(usersData);
            } else {
                cleanup = getExpertList(usersData);
            }
        });

        return () => {
            cleanup();
        };
    }, [user?.id, tab]);

    const onRefresh = useCallback(() => {
        try {
            setRefreshing(true);
            let cleanup = () => { };

            fetchAllUsers().then((usersData) => {
                if (tab === 0) {
                    cleanup = getChatList(usersData);
                } else {
                    cleanup = getExpertList(usersData);
                }
            });

            return () => {
                cleanup();
            };
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false);
        }
    }, [tab]);

    const fetchAllUsers = async () => {
        try {
            const usersRef = firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/users');
            const usersSnapshot = await usersRef.once('value');
            if (usersSnapshot.val()) {
                const usersData = Object.values(usersSnapshot.val())
                return usersData
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    return (
        <View style={styles.container}>
            <InsideHeader title={user.role.toLowerCase() === 'customer' ? "Trò chuyện cùng chuyên gia" : "Trò chuyện"} />
            {user.role.toLowerCase() === 'customer' &&
                <Tab
                    value={tab}
                    onChange={setTab}
                    disableIndicator={true}
                    style={styles.tabs}
                >
                    {tabs.map(tabDetail =>
                        <Tab.Item
                            key={tabDetail.value}
                            active={tab === tabDetail.value}
                            title={tabDetail.title}
                            buttonStyle={(active) => ({
                                backgroundColor: active ? "black" : "white",
                                borderRadius: 8,
                                padding: 0,
                                margin: 0,
                                height: '100%'
                            })}
                            titleStyle={(active) => ({
                                color: active ? "white" : "black",
                                fontSize: 16,
                                fontWeight: "600",
                            })}
                        >
                        </Tab.Item>
                    )}
                </Tab>
            }
            <FlatList
                style={styles.listView}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                data={chatList}
                renderItem={(item, index) => <ChatListView item={item.item} onPress={() => navigation.navigate('Chat', { receiver: item.item })} />}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <TitleText
                        style={{
                            textAlign: 'center',
                            marginLeft: 0
                        }}
                        title={'Danh sách trò chuyện trống'}
                    />
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listView: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    tabs: {
        borderWidth: 1,
        borderColor: '#E7E3E4',
        padding: 5,
        borderRadius: 12,
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        marginTop: 10,
    },
    tabs: {
        borderWidth: 1,
        borderColor: '#E7E3E4',
        padding: 5,
        borderRadius: 12,
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        marginTop: 10,
    }

})