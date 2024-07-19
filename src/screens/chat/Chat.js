import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import ReceiverMessage from '../../components/message/ReceiverMessage';
import UserMessage from '../../components/message/UserMessage';
import SendButton from '../../components/button/SendButton';
import InputGeneric from '../../components/genericInput/InputGeneric';
import MessageButton from '../../components/message/MessageButton';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_LINK } from '../../config/firebase/realtimedb';
import uuid from 'react-native-uuid';
import sendIcon from '../../../assets/icons/send-icon.png';
import Toast from 'react-native-toast-message';
import usePremium from '../../hooks/usePremium';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Chat({ route }) {
    const { receiver } = route.params
    const navigation = useNavigation()
    const user = useSelector(userSelector)
    const isPremiumValid = usePremium()
    const [loading, setLoading] = useState(false)
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState(null)
    const [roomId, setRoomId] = useState(receiver.roomId)

    if (!isPremiumValid && user.role === 'Customer') {
        navigation.goBack();
        Toast.show({
            type: 'error',
            text1: 'Chức năng này yêu cầu tài khoản premium',
        });
    }

    useEffect(() => {
        const cleanupMessageData = fetchMessageData();

        return () => {
            cleanupMessageData();
        };
    }, [roomId]);
    const fetchMessageData = () => {
        const chatRef = firebase
            .app()
            .database(DATABASE_LINK)
            .ref('/messages/' + roomId)
        const onChildAdded = chatRef.on('child_added', snapshot => {
            const messageData = snapshot.val();
            if (messageData) {
                setChat(prevMessages => [messageData, ...prevMessages])
            }
        });

        return () => {
            chatRef.off('child_added', onChildAdded);
        };
    }

    const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

    const sendMessage = () => {
        if (!message || msgvalid(message) == 0) {
            Toast.show({
                type: 'error',
                text1: 'Vui lòng nhập tin nhắn',
            });
            return false;
        }
        setLoading(true);
        const receiverId = receiver.id ? receiver.id : receiver.userId ? receiver.userId : receiver.expertId
        if (!roomId) {
            let roomId = uuid.v4();
            setRoomId(roomId);
            const timestamp = new Date().toISOString()
            let senderData = {
                roomId,
                id: user.id,
                lastMessage: '',
                lastMessageFrom: '',
                timestamp: timestamp,
            };
            firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/chatlist/' + receiverId + '/' + user.id)
                .update(senderData)
            let receiverData = {
                roomId,
                id: receiverId,
                lastMessage: '',
                lastMessageFrom: '',
                timestamp: timestamp,
            };
            firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/chatlist/' + user.id + '/' + receiverId)
                .update(receiverData)
            const newMessageRef = firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/messages/' + roomId)
                .push();
            newMessageRef.set({
                roomId: roomId,
                message: message,
                from: user.id,
                to: receiverId,
                timestamp: timestamp,
                messageType: 'text',
            }).then(() => {
                let chatListupdate = {
                    lastMessage: message,
                    lastMessageFrom: user.id,
                    timestamp: timestamp,
                };
                firebase
                    .app()
                    .database(DATABASE_LINK)
                    .ref('/chatlist/' + receiverId + '/' + user.id)
                    .update(chatListupdate)
                firebase
                    .app()
                    .database(DATABASE_LINK)
                    .ref('/chatlist/' + user.id + '/' + receiverId)
                    .update(chatListupdate)
            })
        } else {
            const timestamp = new Date().toISOString()
            const newMessageRef = firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/messages/' + roomId)
                .push();
            newMessageRef.set({
                roomId: receiver.roomId,
                message: message,
                from: user.id,
                to: receiverId,
                timestamp: timestamp,
                messageType: 'text',
            }).then(() => {
                let chatListupdate = {
                    lastMessage: message,
                    lastMessageFrom: user.id,
                    timestamp: timestamp,
                };
                firebase
                    .app()
                    .database(DATABASE_LINK)
                    .ref('/chatlist/' + receiverId + '/' + user.id)
                    .update(chatListupdate)
                firebase
                    .app()
                    .database(DATABASE_LINK)
                    .ref('/chatlist/' + user.id + '/' + receiverId)
                    .update(chatListupdate)
            })
        }
        setMessage('');
        setLoading(false)
    };
    const sendButtonMessage = (message) => {
        if (!message || msgvalid(message) == 0) {
            Toast.show({
                type: 'error',
                text1: 'Vui lòng nhập tin nhắn',
            });
            return false;
        }
        setLoading(true);
        const receiverId = receiver.id ? receiver.id : receiver.userId ? receiver.userId : receiver.expertId
        if (!roomId) {
            const timestamp = new Date().toISOString()
            let roomId = uuid.v4();
            setRoomId(roomId);
            let senderData = {
                roomId,
                id: user.id,
                lastMessage: '',
                lastMessageFrom: '',
                timestamp: timestamp,
            };
            firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/chatlist/' + receiverId + '/' + user.id)
                .update(senderData)
            let receiverData = {
                roomId,
                id: receiverId,
                lastMessage: '',
                lastMessageFrom: '',
                timestamp: timestamp,
            };
            firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/chatlist/' + user.id + '/' + receiverId)
                .update(receiverData)
            const newMessageRef = firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/messages/' + roomId)
                .push();
            newMessageRef.set({
                roomId: roomId,
                message: message,
                from: user.id,
                to: receiverId,
                timestamp: new Date().toISOString(),
                messageType: 'text',
            }).then(() => {
                let chatListupdate = {
                    lastMessage: message,
                    lastMessageFrom: user.id,
                    timestamp: message.sendTime,
                };
                firebase
                    .app()
                    .database(DATABASE_LINK)
                    .ref('/chatlist/' + receiverId + '/' + user.id)
                    .update(chatListupdate)
                firebase
                    .app()
                    .database(DATABASE_LINK)
                    .ref('/chatlist/' + user.id + '/' + receiverId)
                    .update(chatListupdate)
            })
        } else {
            const timestamp = new Date().toISOString()
            const newMessageRef = firebase
                .app()
                .database(DATABASE_LINK)
                .ref('/messages/' + roomId)
                .push();
            newMessageRef.set({
                roomId: receiver.roomId,
                message: message,
                from: user.id,
                to: receiverId,
                timestamp: timestamp,
                messageType: 'text',
            }).then(() => {
                let chatListupdate = {
                    lastMessage: message,
                    lastMessageFrom: user.id,
                    timestamp: timestamp,
                };
                firebase
                    .app()
                    .database(DATABASE_LINK)
                    .ref('/chatlist/' + receiverId + '/' + user.id)
                    .update(chatListupdate)
                firebase
                    .app()
                    .database(DATABASE_LINK)
                    .ref('/chatlist/' + user.id + '/' + receiverId)
                    .update(chatListupdate)
            })
        }
        setLoading(false)
    };
    return (
        <View style={styles.container}>
            <InsideHeader title={receiver?.fullName ? receiver?.fullName : receiver?.userName ? receiver?.userName : receiver?.expertName} />
            <FlatList
                style={{ flex: 1 }}
                data={chat}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                inverted
                renderItem={({ item }) => {
                    if (item.from == user.id) {
                        return <UserMessage messageData={item} />
                    } else {
                        return <ReceiverMessage user={receiver} messageData={item} />
                    }
                }}
            />
            {user.role.toLowerCase() === 'customer' && !roomId && <MessageButton message={'Bắt đầu trò chuyện'} onPress={() => {
                sendButtonMessage("Bắt đầu trò chuyện")
            }} />}
            <View style={styles.inputContainer}>
                <InputGeneric
                    placeholder={"Nhập tin nhắn..."}
                    value={message}
                    onChangeText={setMessage}
                    inputContainerStyle={styles.input}
                    containerStyle={styles.containerStyle}
                />
                <SendButton icon={sendIcon} disabled={loading} onPress={sendMessage} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
    },
    input: {
        borderRadius: 48,
        width: screenWidth - 100,
        marginRight: 0,
    },
    containerStyle: {
        width: screenWidth - 80,
    }
})