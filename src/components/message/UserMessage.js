import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import emptyAvatar from '../../../assets/images/empty-avatar.png';
import { vi } from 'date-fns/locale';
import { format } from 'date-fns';
import { Avatar } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width

export default function UserMessage({ messageData }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F27272', '#FBBD98']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.messageContainer}
      >
        <Text style={styles.message}>{messageData.message}</Text>
        <Text style={styles.date}>{messageData.sendTime && format(new Date(messageData.sendTime), 'HH:mm d, MMM yyyy', { locale: vi })}</Text>
      </LinearGradient>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row-reverse'
  },
  messageContainer: {
    maxWidth: screenWidth - 90,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  message: {
    color: 'white',
    fontSize: 18,
  },
  date: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
    textAlign: 'right'
  },
})