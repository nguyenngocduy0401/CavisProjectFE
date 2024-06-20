import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, Linking } from 'react-native';
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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Chat() {
    const navigation = useNavigation()
    const user = useSelector(userSelector)
    const [loading, setLoading] = useState(false)
    const [chat, setChat] = useState(null)
    const [message, setMessage] = useState(null)
    const bot =
    {
        "id": "da8a7be0-e888-4201-8500-3c5b2dba7776",
        "fullName": "Cavis",
        "urlImage": "https://firebasestorage.googleapis.com/v0/b/cavisproject.appspot.com/o/cavis-logo.png?alt=media&token=ec5a2f56-7adc-4abb-b5a8-b478b9d9cb78",
    }
    const item = {
        message: "Cuộc trò chuyện đã được tạo thành công. Chúng tôi sẽ kết nối bạn với chuyên gia trong thời gian sớm nhất",
        from: bot.id,
        // to: user.id,
        sendTime: "2011-10-05T14:48:00.000Z",
        msgType: "text",
    }
    return (
        <View style={styles.container}>
            <InsideHeader title={'Trò chuyện cùng chuyên gia'} />
            <ReceiverMessage user={bot} messageData={item} />
            <MessageButton messageData={item} />
            <UserMessage messageData={item} />
            <View style={styles.inputContainer}>
                <InputGeneric
                    placeholder={"Nhập tin nhắn..."}
                    value={message}
                    onChangeText={setMessage}
                    inputContainerStyle={styles.input}
                    containerStyle={styles.containerStyle}
                />
                <SendButton disabled={loading} onPress={() => console.log("send message")} />
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