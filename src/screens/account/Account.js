import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Account() {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})