import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Header from '../../components/header/Header';
import GenericCarousel from '../../components/genericCarousel/GenericCarousel';
import TitleText from '../../components/text/TitleText';
import HomeTopButton from '../../components/homeTopButton/HomeTopButton';
import compareTopIcon from '../../../assets/icons/compare-skincare-icon.png';
import filterTopIcon from '../../../assets/icons/filter-skincare-icon.png';
import { useNavigation } from '@react-navigation/native';
import PremiumBanner from '../../components/premiumBanner/PremiumBanner';
import SeeAllButton from '../../components/button/SeeAllButton';
import ProductReview from '../../components/productReview/ProductReview';
import TopMethod from '../../components/topMethod/TopMethod';
import Method from '../../components/method/Method';
import MakeupCategory from '../../components/makeupCategory/MakeupCategory';
import { getAnalystProducts } from '../../services/PersonalAnalystService';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const methodData = [
  {
    id: 1,
    image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
    title: "New VR Headsets That Will Shape the Metaverse",
    author: {
      fullName: "Mason Eduard",
      avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
    },
    type: "Skincare",
    date: "2024-01-03T14:48:00.000Z"
  },
  {
    id: 2,
    image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
    title: "New VR Headsets That Will Shape the Metaverse",
    author: {
      fullName: "Mason Eduard",
      avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
    },
    type: "Skincare",
    date: "2024-01-03T14:48:00.000Z"
  },
  {
    id: 3,
    image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
    title: "New VR Headsets That Will Shape the Metaverse",
    author: {
      fullName: "Mason Eduard",
      avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
    },
    type: "Skincare",
    date: "2024-01-03T14:48:00.000Z"
  },
  {
    id: 4,
    image: "https://cdn.tgdd.vn/Files/2023/04/26/1527516/hoc-ngay-cac-buoc-skincare-co-ban-trong-mua-he-de-da-mat-luon-xinh-202304261009570497.jpg",
    title: "New VR Headsets That Will Shape the Metaverse",
    author: {
      fullName: "Mason Eduard",
      avatar: "https://nguoinoitieng.tv/images/nnt/108/0/bkw8.jpg"
    },
    type: "Skincare",
    date: "2024-01-03T14:48:00.000Z"
  },
]
const categoryData = [
  {
    id: 1,
    icon: require('../../../assets/icons/lips-icon.png'),
    title: "Môi"
  },
  {
    id: 2,
    icon: require('../../../assets/icons/firm-icon.png'),
    title: "Da"
  },
  {
    id: 3,
    icon: require('../../../assets/icons/chin-icon.png'),
    title: "Cằm"
  },
  {
    id: 4,
    icon: require('../../../assets/icons/acne-icon.png'),
    title: "Mụn"
  },
  {
    id: 5,
    icon: require('../../../assets/icons/eyes-icon.png'),
    title: "Mắt"
  },
  {
    id: 6,
    icon: require('../../../assets/icons/eyes-icon-2.png'),
    title: "Mí"
  },
]
export default function MakeUp() {
  const navigation = useNavigation()

  const [category, setCategory] = useState(categoryData)
  const [products, setProducts] = useState([])
  const [methods, setMethods] = useState(methodData)
  async function getProducts() {
    try {
      const data = await getAnalystProducts(null);
      setProducts(data?.data?.items)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <ScrollView style={styles.container}>
      <Header />
      <TitleText title={'Makeup'} style={styles.title} />
      <GenericCarousel />
      <FlatList
        style={styles.category}
        horizontal
        data={category}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MakeupCategory key={item.id} icon={item.icon} title={item.title} onPress={() => console.log("click category" + item.id)} />
        )}
      />
      <PremiumBanner />
      <>
        <View style={styles.titleContainer}>
          <View style={{ width: "80%" }}>
            <TitleText title={'Sản phẩm gợi ý'} style={styles.title} />
          </View>
          <SeeAllButton onPress={() => navigation.navigate('Products')} />
        </View>
        <FlatList
          style={styles.productReview}
          horizontal
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductReview key={item.id} image={item.urlImage} title={item.productName} description={item.description} onPress={() => navigation.navigate("ProductDetail", { id: item.id })} />
          )}
        />
      </>
      <>
        <View style={styles.titleContainer}>
          <View style={{ width: "80%" }}>
            <TitleText title={'Phương pháp hữu ích'} style={styles.title} />
          </View>
          <SeeAllButton onPress={() => console.log('See all tips')} />
        </View>
        {methods.length > 0 &&
          <View style={{ paddingTop: 20 }}>
            <TopMethod image={methods[0].image} title={methods[0].title} author={methods[0].author} type={methods[0].type} date={methods[0].date} onPress={() => console.log(methods[0].id)} />
            {methods.length > 1 && methods.slice(1).map((method) => (
              <Method key={method.id} image={method.image} title={method.title} type={method.type} onPress={() => console.log(method.id)} />
            ))}
          </View>
        }
      </>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    marginLeft: 20,
    marginBottom: 0,
    marginTop: 20,
  },
  topButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  productReview: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  category: {
    paddingLeft: 20,
    gap: 20,
  },
})