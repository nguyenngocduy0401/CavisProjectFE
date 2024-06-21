import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_LINK } from '../../config/firebase/realtimedb';
import { userSelector } from '../../store/selector';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import ChatListView from '../../components/chatListView/ChatListView';
import { useNavigation } from '@react-navigation/native';
import { Tab } from '@rneui/themed';
import TitleText from '../../components/text/TitleText';

const tabs = [
    {
        value: 0,
        title: 'Trò chuyện',
    },
    {
        value: 1,
        title: 'Đang chờ'
    },
    {
        value: 2,
        title: 'Kết thúc'
    },
]

export default function ExpertChatList() {
    const user = useSelector(userSelector);
    const navigation = useNavigation()
    const [tab, setTab] = useState(0);
    const [chats, setChats] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [chatsInit, setChatsInit] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getRooms = (usersData) => {
        const chatRoomsRef = firebase
            .app()
            .database(DATABASE_LINK)
            .ref('/chatrooms')
        const onValueChange = chatRoomsRef.on('value', snapshot => {
            const data = snapshot.val()
            setChatsInit(snapshot.val())
            const updateData = []
            for (let id in data) {
                const user = usersData[data[id].userId];
                updateData.push({ id, user });
            }
            setChats(updateData);
        });
        return () => {
            chatRoomsRef.off('value', onValueChange);
        };
    }
    useEffect(() => {
        fetchAllUsers().then((usersData) => getRooms(usersData))
    }, [user.id]);

    useEffect(() => {
        let rooms = [];
        if (tab === 0) {
            chats.map((chat) => {
                if (chatsInit[chat.id].userId === user.id) {
                    rooms.push(chat);
                }
            })
        } else if (tab === 1) {
            chats.map((chat) => {
                if (chatsInit[chat.id].status === 'waiting') {
                    rooms.push(chat);
                }
            })
        } else {

        }
        setChatList(rooms)
    }, [tab, chats]);
    const onRefresh = useCallback(() => {
        try {
            setRefreshing(true);
            getRooms()
        } catch (error) {
            console.log(error)
        } finally {
            setRefreshing(false);
        }
    }, []);

    const fetchAllUsers = async () => {
        try {
            const usersRef = firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/users');
            const usersSnapshot = await usersRef.once('value');
            const usersData = usersSnapshot.val();
            return usersData
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    return (
        <View style={styles.container}>
            <InsideHeader title={"Danh sách tin nhắn"} />
            <Tab
                value={tab}
                onChange={setTab}
                disableIndicator={true}
                style={styles.tabs}
            >
                {tabs.map(tabDetail =>
                    <Tab.Item
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
            {chatList.length > 0 ?
                <FlatList
                    style={styles.listView}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    data={chatList}
                    renderItem={(item, index) => <ChatListView item={item.item} onPress={() => navigation.navigate('Chat', { receiverData: item })} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
                :
                <TitleText
                    style={{
                        textAlign: 'center',
                        marginLeft: 0
                    }}
                    title={'Danh sách tin nhắn trống'}
                />
            }
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
    }
})