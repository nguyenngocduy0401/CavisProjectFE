import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GenericButton from '../../components/button/GenericButton'
import { logout } from '../../services/UserService'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../store/features/authSlice'

export default function Account() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await logout()
      .then(dispatch(removeUser()))
  }
  return (
    <View style={styles.container}>
      <Text>Account</Text>
      <GenericButton
        title={'LOGOUT'}
        onPress={handleLogout}
        buttonStyle={styles.buttonStyleButton}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonStyleButton: {
    height: 50,
    borderWidth: 0,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
  },
})