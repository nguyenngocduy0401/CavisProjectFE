import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

export default function SkinCare() {
  return (
    <View style={styles.container}>
      <Text>SkinCare</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})