import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { MinusCircle, PlusCircle, DollarSign, Clock8, Star, ShoppingCart } from 'lucide-react-native';
import { Header } from '../../ui-components/header/header.component';
import { RootNavigationProps } from '../../navigation/navigation.types';
import { DEVELOP_URL } from '../../helper/helper';
import colors from '../../helper/colors';
import { useApiRequest } from '../../hooks/useRequest';
import styles from './product.style';

const ProductDetail = ({ route }: RootNavigationProps<'ProductDetail'>) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const BASE_URL = `${DEVELOP_URL}/api/`;
  const { sendRequest, loading } = useApiRequest();

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    console.log('Added to cart:', product, quantity);
  };

  const getProduct = async (id) => {
    const response = await sendRequest('get', `product/${id}`);
    setProduct(response.data.product);
  };

  const getSimilar = async (id) => {
    const response = await sendRequest('get', `product/${id}/similar`);
    setSimilarProducts(response.data.products || []);
  };

  useEffect(() => {
    getProduct(route.params.product._id);
    getSimilar(route.params.product._id);
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Header backIcon title="Детали" />
      <View style={{ flex: 1, padding: 15 }}>
        {Object.keys(product).length > 0 ? (
          <>
            <Swiper
              style={{ height: 300 }}
              dot={<View style={styles.dash} />}
              activeDot={<View style={styles.activeDash} />}
              paginationStyle={styles.pagination}
              loop
              containerStyle={{ maxHeight: 300, minHeight: 300 }}
            >
              {Array.isArray(product?.photos) && product.photos.length > 0 ? (
                product.photos.map((photo: string, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: `${BASE_URL}${photo}` }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ))
              ) : (
                <Image
                  source={{ uri: 'https://via.placeholder.com/300' }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              )}
            </Swiper>

            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              <View style={styles.row}>
                <View style={styles.iconCard}>
                  <DollarSign color="#FE8C00" size={20} />
                  <Text style={styles.productDeliveryInfo}>Бесплатная доставка</Text>
                </View>
                <View style={styles.iconCard}>
                  <Clock8 color="#FE8C00" size={20} />
                  <Text style={styles.productDeliveryInfo}>20 - 30 мин</Text>
                </View>
                <View style={styles.iconCard}>
                  <Star color="#FE8C00" fill="#FE8C00" size={20} />
                  <Text style={styles.productDeliveryInfo}>4.5</Text>
                </View>
              </View>
              <View style={styles.line}></View>
              <Text style={styles.description}>Описание</Text>
              <Text style={styles.productDescription}>
                {product.description || 'Нет описания!'}
              </Text>
            </View>
            <Text style={styles.similarTitle}>Похожие товары</Text>
            {similarProducts.length > 0 ? (
              <FlatList
                data={similarProducts}
                keyExtractor={(item) => item._id}
                numColumns={2} // Two-column grid
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.similarProductCard} >
                    <Image
                      source={{
                        uri: item.photos?.[0]
                          ? `${BASE_URL}${item.photos[0]}`
                          : 'https://via.placeholder.com/150',
                      }}
                      style={styles.similarProductImage}
                    />
                    <Text style={styles.similarProductName}>{item.name}</Text>
                    <View style={styles.similarProductInfo}>
                      <View style={styles.iconRow}>
                        <Star size={15} color="#FE8C00" />
                        <Text style={styles.similarProductRating}>4.9</Text>
                        <Clock8 size={15} color="#FE8C00" />
                        <Text style={styles.similarProductDistance}>{item.deliveryTime}м</Text>
                      </View>
                      <Text style={styles.similarProductPrice}>${item.price}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.noSimilar}>Нет похожих товаров.</Text>
            )}
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={colors.black} />
          </View>
        )}
      </View>
      <View style={styles.cartSection}>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={handleDecrease}>
            <MinusCircle size={40} color="#FE8C00" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease}>
            <PlusCircle size={40} color="#FE8C00" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <ShoppingCart size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>В корзину</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

};

export default ProductDetail;
