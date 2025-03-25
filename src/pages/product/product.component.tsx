import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Clock8,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  Star,
} from 'lucide-react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Swiper from 'react-native-swiper';
import AuthContext from '../../contexts/AuthContext';
import colors from '../../helper/colors';
import {DEVELOP_URL} from '../../helper/helper';
import {useApiRequest} from '../../hooks/useRequest';
import {RootNavigationProps} from '../../navigation/navigation.types';
import {Header} from '../../ui-components/header/header.component';
import styles from './product.style';

const ProductDetail = ({route}: RootNavigationProps<'ProductDetail'>) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const BASE_URL = `${DEVELOP_URL}/api/`;
  const {sendRequest, loading} = useApiRequest();
  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const {cart, setCart, token} = useContext(AuthContext);

  const saveCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];

      // Проверяем, что cart является массивом
      if (!Array.isArray(cart)) {
        cart = [];
      }

      // Добавляем новый продукт в корзину
      const updatedCart = [...cart, {...product, quantity}];

      // Сохраняем обновленную корзину в AsyncStorage
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));

      setCart(updatedCart);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Успешно',
        textBody: 'Добавлено на карзину',
      });
    } catch (error) {
      console.error('Failed to save cart to AsyncStorage', error);
    }
  };

  const getProduct = async (id: string) => {
    Promise.all([
      sendRequest('get', `product/one/${id}`).then(response =>
        setProduct(response.data.product),
      ),
      sendRequest('get', `product/${id}/similar`).then(response =>
        setSimilarProducts(response.data.products || []),
      ),
    ]);
  };
  // Функция удаления из корзины
  const removeFromCart = async () => {
    try {
      const updatedCart = cart.filter(item => item._id !== product._id);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Успешно',
        textBody: 'Удалено из корзины',
      });
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  // Проверяем, добавлен ли товар в корзину
  const isInCart = cart.some(item => item._id === product._id);

  useEffect(() => {
    getProduct(route.params.product._id);
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={colors.main} />
        </View>
      )}
      <ScrollView>
        <Header backIcon title="Детали" />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingBottom: 90,
            marginTop: 15,
          }}>
          {Object.keys(product).length > 0 && (
            <>
              <Swiper
                style={{height: 300}}
                dot={<View style={styles.dash} />}
                activeDot={<View style={styles.activeDash} />}
                paginationStyle={styles.pagination}
                loop
                containerStyle={{maxHeight: 300, minHeight: 300}}>
                {Array.isArray(product?.photos) && product.photos.length > 0 ? (
                  product.photos.map((photo: string, index: number) => (
                    <Image
                      key={index}
                      // source={{uri: `${BASE_URL}${photo}`}}
                      source={{
                        uri: 'https://media.istockphoto.com/id/1309352410/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%87%D0%B8%D0%B7%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80-%D1%81-%D0%BF%D0%BE%D0%BC%D0%B8%D0%B4%D0%BE%D1%80%D0%B0%D0%BC%D0%B8-%D0%B8-%D1%81%D0%B0%D0%BB%D0%B0%D1%82%D0%BE%D0%BC-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B4%D0%BE%D1%81%D0%BA%D0%B5.jpg?s=612x612&w=0&k=20&c=dW1Aguo-4PEcRs79PUbmMXpx5YrBjqSYiEhwnddbj_g=',
                      }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  ))
                ) : (
                  <Image
                    source={{uri: 'https://via.placeholder.com/300'}}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                )}
              </Swiper>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price} c</Text>
                <View style={styles.row}>
                  <View style={styles.iconCard}>
                    <Text style={styles.productDeliveryInfo}>
                      <Text style={{color: colors.main}}>C</Text> Бесплатная
                      доставка
                    </Text>
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
                  keyExtractor={item => item._id}
                  numColumns={2} // Two-column grid
                  columnWrapperStyle={styles.columnWrapper}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => getProduct(item._id)}
                      style={styles.similarProductCard}>
                      <Image
                        source={{
                          uri: 'https://media.istockphoto.com/id/1309352410/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%87%D0%B8%D0%B7%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80-%D1%81-%D0%BF%D0%BE%D0%BC%D0%B8%D0%B4%D0%BE%D1%80%D0%B0%D0%BC%D0%B8-%D0%B8-%D1%81%D0%B0%D0%BB%D0%B0%D1%82%D0%BE%D0%BC-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B4%D0%BE%D1%81%D0%BA%D0%B5.jpg?s=612x612&w=0&k=20&c=dW1Aguo-4PEcRs79PUbmMXpx5YrBjqSYiEhwnddbj_g=',
                        }}
                        // source={{
                        //   uri: item.photos?.[0]
                        //     ? `${BASE_URL}${item.photos[0]}`
                        //     : 'https://via.placeholder.com/150',
                        // }}
                        style={styles.similarProductImage}
                      />
                      <Text style={styles.similarProductName}>{item.name}</Text>
                      <View style={styles.similarProductInfo}>
                        <View style={styles.iconRow}>
                          <Star size={15} color="#FE8C00" />
                          <Text style={styles.similarProductRating}>4.9</Text>
                          <Clock8 size={15} color="#FE8C00" />
                          <Text style={styles.similarProductDistance}>
                            {item.deliveryTime}м
                          </Text>
                        </View>
                        <Text style={styles.similarProductPrice}>
                          {item.price} с
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.noSimilar}>Нет похожих товаров.</Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.cartSection}>
        {!isInCart && (
          <View style={styles.quantityControls}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleDecrease}>
              <MinusCircle size={40} color="#FE8C00" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleIncrease}>
              <PlusCircle size={40} color="#FE8C00" />
            </TouchableOpacity>
          </View>
        )}

        {isInCart ? (
          <TouchableOpacity
            onPress={removeFromCart}
            activeOpacity={0.8}
            style={[
              styles.button,
              {backgroundColor: 'red', width: '100%', justifyContent: 'center'},
            ]}>
            <ShoppingCart size={20} color="#fff" style={styles.icon} />
            <Text style={[styles.buttonText]}>Удалить</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={saveCart}
            activeOpacity={0.8}
            style={styles.button}>
            <ShoppingCart size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>В корзину</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
