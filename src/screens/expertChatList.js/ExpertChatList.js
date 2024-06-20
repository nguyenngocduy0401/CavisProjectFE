import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
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
    const [tab, setTab] = useState("answering");

    const [chatList, setchatList] = useState([]);
    useEffect(() => {
        getChatlist();
    }, [tab]);

    const getChatlist = async () => {
        if (tab === 0) {

        } else if (tab === 1)
            firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/chatlist/' + user?.id)
                .on('value', snapshot => {
                    if (snapshot.val() != null) {
                        setchatList(Object.values(snapshot.val()))
                    }
                });
    }

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
                    renderItem={(item) => <ChatListView user={item} onPress={navigation.navigate('Chat', { receiverData: item })} />}
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
        paddingTop: 10,
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