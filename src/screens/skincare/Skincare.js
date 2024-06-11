import React, { useState } from 'react';
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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const productData = [
  {
    id: 1,
    image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
    title: "The cocoon",
    description: "Sản phẩm cocoon abcxyz"
  },
  {
    id: 2,
    image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
    title: "The cocoon",
    description: "Sản phẩm cocoon abcxyz"
  },
  {
    id: 3,
    image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
    title: "The cocoon",
    description: "Sản phẩm cocoon abcxyz"
  },
  {
    id: 4,
    image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
    title: "The cocoon",
    description: "Sản phẩm cocoon abcxyz"
  },
  {
    id: 5,
    image: "https://product.hstatic.net/200000551679/product/tay-da-chet-toan-than-cocoon-tu_4141e9e2ed2c4de0bcea91c5d56125e9_1024x1024.jpg",
    title: "The cocoon",
    description: "Sản phẩm cocoon abcxyz"
  },
]
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
export default function SkinCare() {
  const navigation = useNavigation()

  const [products, setProducts] = useState(productData)
  const [methods, setMethods] = useState(methodData)
  return (
    <ScrollView style={styles.container}>
      <Header />
      <TitleText title={'Skincare'} style={styles.title} />
      <GenericCarousel />
      <View style={styles.topButton}>
        <HomeTopButton onPress={() => console.log("compare")} title={'Compare my skin'} backgroundColor={'#EBF3F8'} icon={compareTopIcon}
          containerStyle={{
            alignItems: 'center',
            flexDirection: 'row',
            width: '70%',
            height: screenWidth / 5,
          }}
          titleStyle={{
            marginLeft: 20,
            marginRight: 20,
            width: '70%',
          }}
          iconStyle={{padding: 16}}
        />
        <HomeTopButton onPress={() => console.log("filter")} backgroundColor={'#FFF9F0'} icon={filterTopIcon}
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '25%',
            height: 'auto',
          }}
        />
      </View>
      <PremiumBanner />
      <>
        <View style={styles.titleContainer}>
          <View style={{ width: "80%" }}>
            <TitleText title={'Recent reviews'} style={styles.title} />
          </View>
          <SeeAllButton onPress={() => navigation.navigate('Products')} />
        </View>
        <FlatList
          style={styles.productReview}
          horizontal
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductReview key={item.id} image={item.image} title={item.title} description={item.description} onPress={() => navigation.navigate("ProductDetail", { id: item.id })} />
          )}
        />
      </>
      <>
        <View style={styles.titleContainer}>
          <View style={{ width: "80%" }}>
            <TitleText title={'Useful tips'} style={styles.title} />
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
})