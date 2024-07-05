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
import { getAnalystMethods, getAnalystProducts } from '../../services/PersonalAnalystService';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SkinCare() {
  const isFocused = useIsFocused();
  const navigation = useNavigation()

  const [products, setProducts] = useState([])
  const [methods, setMethods] = useState([])
  async function getProducts() {
    try {
      const data = await getAnalystProducts({
        CompatibleProducts: "Low",
        Category: "Skincare",
        PageSize: 5
      });
      setProducts(data?.data?.items)
    } catch (error) {
      console.log(error)
    }
  }
  async function getMethods() {
    try {
      const data = await getAnalystMethods({
        Category: "Skincare"
      });
      setMethods(data?.data?.items)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isFocused) {
      getProducts()
      getMethods()
    }
  }, [isFocused])
  return (
    <ScrollView style={styles.container}>
      <Header />
      <TitleText title={'Skincare'} style={styles.title} />
      <GenericCarousel />
      <View style={styles.topButton}>
        <HomeTopButton onPress={() => navigation.navigate('SkinCompare')} title={'So sánh làn da của tôi'} backgroundColor={'#EBF3F8'} icon={compareTopIcon}
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
        <HomeTopButton onPress={() => navigation.navigate('CameraOpen')} backgroundColor={'#FFF9F0'} icon={filterTopIcon}
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
          <SeeAllButton onPress={() => navigation.navigate('Methods', { type: "Skincare" })} />
        </View>
        {methods?.length > 0 &&
          <View style={{ paddingTop: 20 }}>
            <TopMethod method={methods[0]} onPress={() => navigation.navigate("MethodDetail", { id: methods[0].id })} />
            {methods.length > 1 && methods.slice(1).map((method) => (
              <Method method={method} onPress={() => navigation.navigate("MethodDetail", { id: method.id })} />
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
    marginLeft: 10,
    marginRight: 10,
  },
})