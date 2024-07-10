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
    id: "9dba7949-edd0-469a-9ee2-225a864ede5b",
    icon: require('../../../assets/icons/primer-icon.png'),
    title: "Kem lót"
  },
  {
    id: "d7114e75-445e-411f-85cc-c2ad4b0ca65c",
    icon: require('../../../assets/icons/foundation-icon.png'),
    title: "Kem nền"
  },
  {
    id: "786b79fb-576a-4999-bf57-ce5ff3792ef6",
    icon: require('../../../assets/icons/cushion-icon.png'),
    title: "Cushion"
  },
  {
    id: "f301d7ab-8c96-4f4b-8b34-5bd8bd2f3798",
    icon: require('../../../assets/icons/blush-icon.png'),
    title: "Phấn má"
  },
]
export default function MakeUp() {
  const isFocused = useIsFocused();
  const navigation = useNavigation()

  const [categories, setCategories] = useState([])
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
  async function getCategory() {
    try {
      setCategories(categoryData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isFocused) {
      getProducts()
      getMethods()
      getCategory()
    }
  }, [isFocused])
  return (
    <ScrollView style={styles.container}>
      <Header />
      <TitleText title={'Makeup'} style={styles.title} />
      <GenericCarousel />
      <View style={styles.category}>
        {categories.length > 0 && categories.map(item =>
          <MakeupCategory key={item.id} icon={item.icon} title={item.title} onPress={() => navigation.navigate('Products', { type: "Makeup", category: item.id })} />
        )}
      </View>
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
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
})