import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { logout } from '../../services/UserService'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../store/features/authSlice'
import { Avatar, Button, Divider, ListItem } from '@rneui/themed'
import emptyAvatar from '../../../assets/images/empty-avatar.png';
import { userSelector } from '../../store/selector'
import TitleText from '../../components/text/TitleText'
import NormalText from '../../components/text/NormalText'
import GenericWhiteButton from '../../components/button/GenericWhiteButton'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import premiumIcon from '../../../assets/icons/premium-icon.png';
import LinearGradient from 'react-native-linear-gradient'
import { getAnalystSkin } from '../../services/PersonalAnalystService'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Account() {
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const user = useSelector(userSelector)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [skin, setSkin] = useState(null)
  const [concerns, setConcerns] = useState([])
  useEffect(() => {
    const getUserSkin = async () => {
      const data = await getAnalystSkin()
      if (data.data) {
        setSkin(data.data?.skinType)
        setConcerns(data.data?.skinConditions)
      }
    }
    if (isFocused && user && user.role.toLowerCase() === "customer") {
      getUserSkin()
    }
  }, [user, isFocused])
  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <ScrollView style={styles.container}>
      <GenericWhiteButton
        icon={<Icon name='share-variant' color={'black'} size={24} />}
        buttonStyle={{
          borderRadius: 25,
          height: 45,
          width: 45,
        }}
        containerStyle={{
          alignItems: 'flex-end',
          marginRight: 20,
          marginVertical: 3,
        }}
      />
      <View style={styles.account}>
        <Avatar size={130} rounded source={user?.urlImage ? { uri: user.urlImage } : emptyAvatar} containerStyle={styles.avatar} />
        <TitleText
          title={user.fullName ? user.fullName : user.userName}
          style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, textAlign: 'center' }}
        />
        <NormalText text={user?.email} style={{ marginTop: 0, marginBottom: 0, textAlign: 'center' }} />
        <GenericWhiteButton
          buttonStyle={{
            height: 40,
            borderRadius: 30,
            marginTop: 10,
          }}
          title={'Chỉnh sửa thông tin'}
          onPress={() => console.log('Edit profile')}
        />
      </View>
      {user && user.role.toLowerCase() === "customer" &&
        <>
          <TitleText title={'Premium'} style={styles.title} />
          <Button
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ["#FFEEE9", "#FFEEE9", "#fcd4bc"],
              locations: [0, 0.5, 1],
              start: { x: 0, y: 0.7 },
              end: { x: 1, y: 0.7 },
            }}
            containerStyle={styles.premiumBanner}
            buttonStyle={styles.premiumButton}
            onPress={() => navigation.navigate('Premium')}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={premiumIcon}
                style={styles.premiumIcon}
              />
              <View>
                <TitleText title={'Mở khóa Cavis Premium'} style={{ marginLeft: 20, marginBottom: 0, marginTop: 0, fontSize: 18 }} />
                <NormalText text={'Hãy bắt đầu với Cavis ngay hôm nay!'} style={{ marginLeft: 20 }} />
              </View>
            </View>
            <Icon name='chevron-right' size={24} color={'#6E6E6E'} />
          </Button>
          <TitleText title={'Làn da của tôi'} style={styles.title} />
          <View style={styles.skinContainer}>
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content style={styles.listContent}>
                <ListItem.Subtitle style={styles.listSubtitle}>Loại da</ListItem.Subtitle>
                <ListItem.Title style={styles.listTitle}>{skin}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <Divider style={styles.divider} />
            <ListItem containerStyle={styles.listItem}>
              <ListItem.Content style={styles.listContent}>
                <ListItem.Subtitle style={styles.listSubtitle}>Vấn đề da</ListItem.Subtitle>
                <ListItem.Title style={styles.listTitle}>{concerns.length > 0 && concerns.length > 2 ? concerns.slice(0, 2).map(concern => concern).join(' + ') + '...' : concerns.map(concern => concern).join(' + ')}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <Divider style={styles.divider} />
            <ListItem containerStyle={styles.listItem} onPress={() => navigation.navigate('Questions', { type: 'again' })}>
              <ListItem.Content style={styles.listContent}>
                <ListItem.Subtitle style={styles.listSubtitle}>Thực hiện kiểm tra loại da</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </View>
        </>
      }
      <Button
        icon={<Icon2 name='logout' size={22} style={{ marginRight: 5, fontWeight: '300' }} color={'#6E6E6E'} />}
        title={'Đăng xuất'}
        titleStyle={{ color: '#6E6E6E', fontWeight: '300' }}
        buttonStyle={{ backgroundColor: '#F7F7F7', height: 45 }}
        onPress={handleLogout}
        containerStyle={{
          marginBottom: 30,
          borderRadius: 30,
          marginLeft: 20,
          width: 150,
        }}
        loading={loading}
      />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#FDD3CA',
    marginBottom: 10,
    marginTop: 5,
  },
  buttonStyleButton: {
    height: 50,
    borderWidth: 0,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  account: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 20,
    marginBottom: 0,
    marginTop: 20,
  },
  premiumIcon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  premiumBanner: {
    padding: 20,
  },
  premiumButton: {
    padding: 20,
    borderRadius: 16,
    paddingLeft: 20,
    justifyContent: 'space-between'
  },
  skinContainer: {
    borderRadius: 16,
    margin: 20,
    borderWidth: 1,
    borderColor: '#E7E3E4',
  },
  listItem: {
    borderRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  divider: {
    marginLeft: 20,
    marginRight: 20,
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listSubtitle: {
    color: '#6E6E6E',
    fontSize: 16,
  },
  listTitle: {}
})