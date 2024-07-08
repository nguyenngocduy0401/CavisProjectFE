import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import Header from '../../components/header/Header';
import GenericCarousel from '../../components/genericCarousel/GenericCarousel';
import TitleText from '../../components/text/TitleText';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import PremiumBanner from '../../components/premiumBanner/PremiumBanner';
import SeeAllButton from '../../components/button/SeeAllButton';
import ProductReview from '../../components/productReview/ProductReview';
import TopMethod from '../../components/topMethod/TopMethod';
import Method from '../../components/method/Method';
import MakeupCategory from '../../components/makeupCategory/MakeupCategory';
import { getAnalystMethods, getAnalystProducts } from '../../services/PersonalAnalystService';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
  const isFocused = useIsFocused();
  const navigation = useNavigation()

  const [category, setCategory] = useState(categoryData)
  const [products, setProducts] = useState([])
  const [methods, setMethods] = useState([])
  async function getProducts() {
    try {
      const data = await getAnalystProducts({
        CompatibleProducts: "Low",
        Category: "Makeup",
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
        Category: "Makeup"
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
            <TitleText title={'Sản phẩm makeup'} style={styles.title} />
          </View>
          <SeeAllButton onPress={() => navigation.navigate('Products', { type: "Makeup" })} />
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
            <TitleText title={'Phương pháp makeup'} style={styles.title} />
          </View>
          <SeeAllButton onPress={() => navigation.navigate('Methods', { type: "Makeup" })} />
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
  category: {
    paddingLeft: 20,
    gap: 20,
  },
})