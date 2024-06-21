import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, Linking, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InsideHeader from '../../components/insideHeader/InsideHeader';
import NormalText from '../../components/text/NormalText';
import TitleText from '../../components/text/TitleText';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selector';
import ReceiverMessage from '../../components/message/ReceiverMessage';
import UserMessage from '../../components/message/UserMessage';
import SendButton from '../../components/button/SendButton';
import InputGeneric from '../../components/genericInput/InputGeneric';
import MessageButton from '../../components/message/MessageButton';
import { firebase } from '@react-native-firebase/database';
import { DATABASE_LINK } from '../../config/firebase/realtimedb';
import Toast from 'react-native-toast-message';
import { BOT } from '../../config/firebase/bot';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Chat({ route }) {
  const { room } = route.params
  const navigation = useNavigation()
  const user = useSelector(userSelector)
  const [loading, setLoading] = useState(false)
  const [chat, setChat] = useState([])
  const [message, setMessage] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchAllUsers()
  }, [user.id]);

  const fetchAllUsers = async () => {
    try {
      const usersRef = firebase
        .app()
        .database(DATABASE_LINK)
        .ref('/users');
      const usersSnapshot = await usersRef.once('value');
      const usersData = usersSnapshot.val();
      if (usersData) {
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (!room.id) return;

    const chatRef = firebase
      .app()
      .database(DATABASE_LINK)
      .ref(`/chatrooms/${room.id}/messages`);
    const onChildAdded = chatRef.on('child_added', snapshot => {
      const messageData = snapshot.val();
      const sender = users[messageData.senderId];
      setChat(prevMessages => [
        {
          ...messageData,
          sender
        },
        ...prevMessages])
    });

    return () => {
      chatRef.off('child_added', onChildAdded);
    };
  }, [room.id]);

  const sendMessage = (roomId, messageText, sender) => {
    if (!messageText.trim()) return;

    setLoading(true);
    const newMessageRef = firebase
      .app()
      .database(DATABASE_LINK)
      .ref(`/chatrooms/${roomId}/messages`).push();
    newMessageRef.set({
      message: messageText,
      senderId: sender.id,
      timestamp: new Date().toISOString(),
    });
    setLoading(false)
    setMessage('');
  };
  return (
    <View style={styles.container}>
      <InsideHeader title={room.user.fullName} />
      {/* <MessageButton message={'Bắt đầu trò chuyện'} onPress={() => {
                sendMessage(roomId, "Bắt đầu trò chuyện", user)
                sendMessage(roomId, "Cuộc trò chuyện đã được tạo thành công. Chúng tôi sẽ kết nối bạn với chuyên gia trong thời gian sớm nhất", BOT)
            }} /> */}
      <FlatList
        style={{ flex: 1 }}
        data={chat}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        inverted
        renderItem={({ item }) => {
          if (item.senderId == user.id) {
            return <UserMessage messageData={item} />
          } else {
            return <ReceiverMessage user={item.sender} messageData={item} />
          }
        }}
      />
      <View style={styles.inputContainer}>
        <InputGeneric
          placeholder={"Nhập tin nhắn..."}
          value={message}
          onChangeText={setMessage}
          inputContainerStyle={styles.input}
          containerStyle={styles.containerStyle}
        />
        <SendButton disabled={loading} onPress={() => sendMessage(room.id, message, user)} />
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