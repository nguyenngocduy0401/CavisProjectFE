import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/header/Header'

export default function Insights() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Insights</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})