import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Header from '../../components/header/Header';
import GenericCarousel from '../../components/genericCarousel/GenericCarousel';
import TitleText from '../../components/text/TitleText';
import HomeTopButton from '../../components/homeTopButton/HomeTopButton';
import compareTopIcon from '../../../assets/icons/compare-skincare-icon.png';
import filterTopIcon from '../../../assets/icons/filter-skincare-icon.png';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import PremiumBanner from '../../components/premiumBanner/PremiumBanner';
import SeeAllButton from '../../components/button/SeeAllButton';
import ProductReview from '../../components/productReview/ProductReview';
import TopMethod from '../../components/topMethod/TopMethod';
import Method from '../../components/method/Method';
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
export default function SkinCare() {
  const isFocused = useIsFocused();
  const navigation = useNavigation()

  const [products, setProducts] = useState([])
  const [methods, setMethods] = useState(methodData)
  async function getProducts() {
    try {
      const data = await getAnalystProducts({
        CompatibleProducts: "Extremely",
        Category: "Skincare"
      });
      setProducts(data?.data?.items)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isFocused) {
      getProducts()
    }
  }, [isFocused])
  return (
    <ScrollView style={styles.container}>
      <Header />
      <TitleText title={'Skincare'} style={styles.title} />
      <GenericCarousel />
      <View style={styles.topButton}>
        <HomeTopButton onPress={() => console.log("compare")} title={'So sánh làn da của tôi'} backgroundColor={'#EBF3F8'} icon={compareTopIcon}
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
          iconStyle={{ padding: 16 }}
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
            <TitleText title={'Sản phẩm gợi ý'} style={styles.title} />
          </View>
          <SeeAllButton onPress={() => navigation.navigate('Products', { type: "Skincare" })} />
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
            <TopMethod image={methods[0].image} title={methods[0].title} author={methods[0].author} type={methods[0].type} date={methods[0].date} onPress={() => navigation.navigate("MethodDetail", { id: methods[0].id })} />
            {methods.length > 1 && methods.slice(1).map((method) => (
              <Method key={method.id} image={method.image} title={method.title} type={method.type} onPress={() => navigation.navigate("MethodDetail", { id: method.id })} />
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