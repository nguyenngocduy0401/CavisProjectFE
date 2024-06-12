import { View, Text, SafeAreaView, StyleSheet, LogBox } from 'react-native'
import React from 'react'
import StackNavigator from './src/navigations/StackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import Forget from './src/screens/login/Forget'
import Toast from "react-native-toast-message";
import { Provider } from 'react-redux'
import { store } from './src/store/store'
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <SafeAreaView style={styles.unsafe} />
          <StackNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </View>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  unsafe: {
    flex: 0,
    backgroundColor: '#fff'
  }
});